import { getProduct as getProduct, mainPageProducts } from './api.js';
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
 * Birta niðurstöður úr leit.
 * @param {import('./api.types.js').Products[] | null} results Niðurstöður úr leit
 */
function productDetails(results) {
  const list = el('ul', { class: 'results' });

  if (!results) {
    // Error state
    const item = el('li', { class: 'result' }, 'Villa við að sækja gögn.');
    list.appendChild(item);
  } else {
    // Empty state
    if (results.length === 0) {
      const item = el('li', { class: 'result' }, 'Ekkert fannst.');
      list.appendChild(item);
    }

    // Data state
    for (const result of results) {
      const item = el(
        'li',
        { class: 'result' },
        el('div', { class: 'image' }, el('img', { src: result.image, alt: '' })),
        el('a', {href: `/?id=${result.id}`}, result.title),
        el('p', { class: 'category'}, `Flokkur: ${result.category_title}`),
    el('p', {class: 'verd'},`Verð: ${ result.price } kr.-`)
      );
      list.appendChild(item);
    }
  }

  return el(
    'div',
    { class: 'results' },
    list,
  );
}

/**
 *
 * @param {HTMLElement} parentElement Element sem á að birta niðurstöður í.
 */
export async function searchAndRender(parentElement) {
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

  const results = await mainPageProducts();


  const resultsEl = productDetails(results);

  mainElement.appendChild(resultsEl);
}

/**
 * Sýna forsíðu, hugsanlega með leitarniðurstöðum.
 * @param {HTMLElement} parentElement Element sem á að innihalda forsíðu.
 */
export function renderFrontpage(
  parentElement
) {
  const heading = el('h1', {}, 'Nýjar vörur');
  const container = el('main', {}, heading);
  parentElement.appendChild(container); 
  searchAndRender(parentElement);
}

/**
 * Sýna geimskot.
 * @param {HTMLElement} parentElement Element sem á að innihalda geimskot.
 * @param {string} id Auðkenni geimskots.
 */
export async function renderDetails(parentElement, id) {
  const container = el('main', {});
  const backElement = el(
    'div',
    { class: 'back' },
    el('a', { href: '/' }, 'Til baka'),
  );

  parentElement.appendChild(container);

  setLoading(container);
  const result = await getProduct(id);
  setNotLoading(container);

  // Tómt og villu state, við gerum ekki greinarmun á þessu tvennu, ef við
  // myndum vilja gera það þyrftum við að skilgreina stöðu fyrir niðurstöðu
  if (!result) {
    container.appendChild(el('p', {}, 'Villa við að sækja gögn um vöru!'));
    container.appendChild(backElement);
    return;
  }

  const productElement = result.title
  const categoryTitleElement = result.category_title;
  const descriptionElement = result.description
    ? el(
        'div',
        { class: 'vorusidutitill' },
        el('h2', {}, `${productElement ?? '*Engin titill*'}`),
        el('p', {}, result.description ?? '*Engin lýsing*'),
      )
    : el('p', {}, 'Engar upplýsingar um vöru.');

  const annadProductElement = el(
    'article',
    { class: 'vorucontainer' },
    el('div', { class: 'image' }, el('img', { src: result.image, alt: '' })),
    el('p', { class: 'category'}, `Flokkur: ${categoryTitleElement}`),
    el('p', {class: 'verd'},`Verð: ${ result.price } kr.-`),
    el('p', { class: 'description'}, descriptionElement),
    backElement,
  );
  const tridjaProductElement = el(
    'article',
    { class: 'vorucontainer' },
    el('h1', { class: 'category'}, `Meira úr ${categoryTitleElement}`),
    );

  container.appendChild(annadProductElement);
  container.appendChild(tridjaProductElement);
}