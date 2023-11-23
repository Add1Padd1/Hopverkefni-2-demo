import { getAllProducts, getCategory, getProduct, mainPageProducts } from './api.js';
import { moreProducts as moreProducts} from './api.js';
import { mainPageCategories as mainPageCategories} from './api.js';
import { el } from './elements.js';


/**
 * Setur „loading state“ skilabað meðan gögn eru sótt.
 * @param {HTMLElement} parentElement Element sem á að birta skilbaoð í.
 * @param {Element | undefined} searchForm Leitarform sem á að gera óvirkt.
 */
function setLoading(parentElement, searchForm = undefined) {
  let loadingElement = parentElement.querySelector('.loading');

  if (!loadingElement) {
    loadingElement = el('div', { class: 'loading' }, 'Sæki gögn...');
    parentElement.appendChild(loadingElement);
  }

  if (!searchForm) {
    return;
  }

  const button = searchForm.querySelector('button');

  if (button) {
    button.setAttribute('disabled', 'disabled');
  }
}

/**
 * Fjarlægir „loading state“.
 * @param {HTMLElement} parentElement Element sem inniheldur skilaboð.
 * @param {Element | undefined} searchForm Leitarform sem á að gera virkt.
 */
function setNotLoading(parentElement, searchForm = undefined) {
  const loadingElement = parentElement.querySelector('.loading');

  if (loadingElement) {
    loadingElement.remove();
  }

  if (!searchForm) {
    return;
  }

  const disabledButton = searchForm.querySelector('button[disabled]');

  if (disabledButton) {
    disabledButton.removeAttribute('disabled');
  }
}

/**
 * Taka upplýsingar úr JSON results og birtir vörur.
 * @param {import('./api.types.js').Products[] | null} results Niðurstöður úr leit
 */
function productList(results) {
  const list = el('div', { class: 'productContainer' });

  if (!results) {
    // Error state
    const item = el('section', { class: 'productSection' }, 'Villa við að sækja gögn.');
    list.appendChild(item);
  } else {
    // Empty state
    if (results.length === 0) {
      const item = el('section', { class: 'productSection' }, 'Ekkert fannst.');
      list.appendChild(item);
    }

    // Data state
    for (const result of results) {
      const item = el(
        'section',
        { class: 'productSection' },
        el('div', { class: 'image' }, el('img', { src: result.image, alt: '' })),
        el('a', {href: `/?id=${result.id}`}, result.title),
        el('p', { class: 'category'}, `Flokkur: ${result.category_title}`),
    el('p', {class: 'verd'},`Verð: ${ result.price } kr.-`)
      );
      list.appendChild(item);
    }
  }

  return list;
}

/**
 * Tekur niðurstöður úr JSON og birtir vöruflokka Á FORSÍÐU.
 * @param {import('./api.types.js').Products[] | null} results Niðurstöður úr leit
 */
function productCategoryList(results) {
  const list = el('div', { class: 'frontpageCategoryContainer' });
  const categoryHeader = el('h1', {class: 'categoryHeader'}, 'Skoðaðu vöruflokkana okkar')
  if (!results) {
    // Error state
    const item = el('section', { class: 'categorySection' }, 'Villa við að sækja gögn.');
    list.appendChild(item);
  } else {
    // Empty state
    if (results.length === 0) {
      const item = el('section', { class: 'categorySection' }, 'Ekkert fannst.');
      list.appendChild(item);
    }
    
    list.appendChild(categoryHeader);
    // Data state
    for (const result of results) {
      const item = el(
        'section',
        { class: 'categories' },
        el('a', {href: `/?category=${result.id}`}, result.title),
      );
      list.appendChild(item);
    }
  }

  return list;
}




/**
 * Birtir lista af vörum úr ákveðnum vöruflokki, Á VÖRULISTASÍÐU.
 * @param {import('./api.types.js').Products[] | null} results Niðurstöður úr leit
 */
function listOfCategoryProducts(results) {
  const list = el('div', { class: 'productContainer' });

  if (!results) {
    // Error state
    const item = el('section', { class: 'productSection' }, 'Villa við að sækja gögn.');
    list.appendChild(item);
  } else {
    // Empty state
    if (results.length === 0) {
      const item = el('section', { class: 'productSection' }, 'Ekkert fannst.');
      list.appendChild(item);
    }
    const categoryFlokkur = results[0].category_title;

    // Data state
    for (const result of results) {
      const item = el(
        'section',
        { class: 'productSection' },
        el('div', { class: 'image' }, el('img', { src: result.image, alt: '' })),
        el('a', {href: `/?id=${result.id}`}, result.title),
        el('p', { class: 'category'}, `Flokkur: ${categoryFlokkur}`),
    el('p', {class: 'verd'},`Verð: ${ result.price } kr.-`)
      );
      list.appendChild(item);
    }
  }

  return list;
}




function listOfVorulistaProducts(results) {
  const list = el('div', { class: 'productContainer' });

  if (!results) {
    // Error state
    const item = el('section', { class: 'productSection' }, 'Villa við að sækja gögn.');
    list.appendChild(item);
  } else {
    // Empty state
    if (results.length === 0) {
      const item = el('section', { class: 'productSection' }, 'Ekkert fannst.');
      list.appendChild(item);
    }

    // Data state
    for (const result of results) {
      const item = el(
        'section',
        { class: 'productSection' },
        el('div', { class: 'image' }, el('img', { src: result.image, alt: '' })),
        el('a', {href: `/?id=${result.id}`}, result.title),
        el('p', { class: 'category'}, `Flokkur: ${result.category_title}`),
    el('p', {class: 'verd'},`Verð: ${ result.price } kr.-`)
      );
      list.appendChild(item);
    }
  }

  return list;
}




/**
 * Renderar vörur og birtir þær á parentElement
 * @param {HTMLElement} parentElement Element sem á að birta niðurstöður í.
 */
export async function renderProducts(parentElement) {
  const mainElement = parentElement.querySelector('main');
  const divElement = parentElement.querySelector('divContainer');

  if (!mainElement) {
    console.warn('fann ekki <main> element');
    return;
  }

  // Fjarlægja fyrri niðurstöður
  const resultsElement = mainElement.querySelector('.results');
  if (resultsElement) {
    resultsElement.remove();
  }

  const results = await mainPageProducts();

  // const categories = await mainPageCategories();


  const resultsEl = productList(results);

  // const categoriesEl = productCategoryList(categories);

  mainElement.appendChild(resultsEl);

  // mainElement.appendChild(categoriesEl);

}




/**
 * Sýna forsíðu með 6 vörum og 10 flokkum.
 * @param {HTMLElement} parentElement Element sem á að innihalda forsíðu.
 */
export function renderFrontpage(
  parentElement
) {
  const heading = el('h1', {}, 'Nýjar vörur');
  const container = el('main', {}, heading);

  
  
  parentElement.appendChild(container);
  
  renderProducts(parentElement);
  renderCategoryProducts(parentElement);
}



/**
 * Renderar vöruflokkana á forsíðu.
 * @param {HTMLElement} parentElement Element sem á að innihalda forsíðu.
 */
export async function renderCategoryProducts(parentElement) {
  const mainElement = parentElement.querySelector('main');

  if (!mainElement) {
    console.warn('fann ekki <main> element');
    return;
  }

  // Fjarlægja fyrri niðurstöður
  const resultsElement = mainElement.querySelector('.results');
  if (resultsElement) {
    resultsElement.remove();
  }

  const categories = await mainPageCategories();

  const categoriesEl = productCategoryList(categories);

  const vorusida = el('a', { href: '/?products=products' }, 'Vörulisti')
  mainElement.appendChild(categoriesEl);
  mainElement.appendChild(vorusida);
}
/**
 * Sýnir vörulista.
 * @param {HTMLElement} parentElement Element sem á að innihalda vörulista.
 */
export function renderAllarVorur(
  parentElement
) {
  const heading = el('h1', {}, 'Allar vörur');
  const container = el('main', {}, heading);
  

  parentElement.appendChild(container);
  
  renderAllProducts(parentElement);

}


/**
 * Gerir vörulista.
 * @param {HTMLElement} parentElement Element sem á að innihalda vörulista.
 */
export async function renderAllProducts(parentElement) {
  const mainElement = parentElement.querySelector('main');

  if (!mainElement) {
    console.warn('fann ekki <main> element');
    return;
  }

  // Fjarlægja fyrri niðurstöður
  const resultsElement = mainElement.querySelector('.results');
  if (resultsElement) {
    resultsElement.remove();
  }

  setLoading(mainElement);
  const result = await getAllProducts();
  setNotLoading(mainElement);

  // Tómt og villu state, við gerum ekki greinarmun á þessu tvennu, ef við
  // myndum vilja gera það þyrftum við að skilgreina stöðu fyrir niðurstöðu
  if (!result) {
    mainElement.appendChild(el('p', {}, 'Villa við að sækja gögn um vöru!'));
    // container.appendChild(backElement);
    return;
  }
  const vorulisti = listOfVorulistaProducts(result);
  mainElement.appendChild(vorulisti);
  }





/**
 * Sýnir vöruupplýsingar eftir að clickað er á vöruna.
 * @param {HTMLElement} parentElement Element sem á að innihalda vöru.
 * @param {string} id Auðkenni vöru.
 */
export async function renderDetails(parentElement, id) {
  const container = el('main', {});
  // const backElement = el(
  //   'div',
  //   { class: 'back' },
  //   el('a', { href: '/' }, 'Til baka'),
  // );

  parentElement.appendChild(container);

  const divContainer = el('div', {class: 'divContainer'});

  container.appendChild(divContainer);

  setLoading(divContainer);
  const result = await getProduct(id);
  setNotLoading(divContainer);

  // Tómt og villu state, við gerum ekki greinarmun á þessu tvennu, ef við
  // myndum vilja gera það þyrftum við að skilgreina stöðu fyrir niðurstöðu
  if (!result) {
    divContainer.appendChild(el('p', {}, 'Villa við að sækja gögn um vöru!'));
    // container.appendChild(backElement);
    return;
  }

  const productElement = result.title
  const categoryTitleElement = result.category_title;
  const categoryIdElement = result.category_id;
  setLoading(divContainer);
  const more = await moreProducts(categoryIdElement);
  setNotLoading(divContainer);
  const moreEl = productList(more);
  
  const descriptionElement = result.description
    ? el(
        'div',
        { class: 'vorusidutitill' },
        el('h2', {}, `${productElement ?? '*Engin titill*'}`),
        el('p', {}, result.description ?? '*Engin lýsing*'),
      )
    : el('p', {}, 'Engar upplýsingar um vöru.');

  const annadProductElement = el(
    'div',
    { class: 'voruDetailContainer' },
    el('div', { class: 'image' }, el('img', { src: result.image, alt: '' })),
    el('p', { class: 'category'}, `Flokkur: ${categoryTitleElement}`),
    el('p', {class: 'verd'},`Verð: ${ result.price } kr.-`),
    el('p', { class: 'description'}, descriptionElement),
    // backElement,
  );
  const tridjaProductElement = el(
    'div',
    { class: 'moreHeader' },
    el('h1', { class: 'category'}, `Meira úr ${categoryTitleElement}`),
    );
    divContainer.appendChild(annadProductElement);
    divContainer.appendChild(tridjaProductElement);
    divContainer.appendChild(moreEl);
}




export async function renderDistinctCategory(parentElement, id) {
  const container = el('main', {});
  // const backElement = el(
  //   'div',
  //   { class: 'back' },
  //   el('a', { href: '/' }, 'Til baka'),
  // );

  parentElement.appendChild(container);

  const divContainer = el('div', {class: 'divContainer'});

  container.appendChild(divContainer);

// Þarf að ná í products
  setLoading(divContainer);
  const result = await getCategory(id);
  setNotLoading(divContainer);

  
  

  

  // Tómt og villu state, við gerum ekki greinarmun á þessu tvennu, ef við
  // myndum vilja gera það þyrftum við að skilgreina stöðu fyrir niðurstöðu
  if (!result) {
    divContainer.appendChild(el('p', {}, 'Villa við að sækja gögn um vöru!'));
    // container.appendChild(backElement);
    return;
  }

  const voruflokkur = listOfCategoryProducts(result);

  divContainer.appendChild(voruflokkur);
}