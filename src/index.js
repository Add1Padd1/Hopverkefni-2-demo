import { empty } from './lib/elements.js';
import { renderDetails, renderFrontpage, renderDistinctCategory, renderAllarVorur } from './lib/ui.js';

/**
 * Fall sem keyrir við leit.
 * @param {SubmitEvent} e
 * @returns {Promise<void>}
 */
async function onSearch(e) {
  e.preventDefault();

  // if (!e.target || !(e.target instanceof Element)) {
  //   return;
  // }

  // const { value } = e.target.querySelector('input') ?? {};

  // if (!value) {
  //   return;
  // }

  // await renderProducts(document.body);
  // window.history.pushState({}, '', `/?query=${value}`);
}

/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir.
 * Ef `id` er gefið er vara birt, annars er forsíða birt.
 */
function route() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const category = params.get('category');
  const products = params.get('products');


// document.addEventListener('DOMContentLoaded', () => {
//   document.getElementById('/products').addEventListener('click', function(event) {
//     event.preventDefault();
//     renderAllarVorur(document.body);
//   })
// })
  // var pathArray = window.location.pathname.split('/');
  // console.log(pathArray);

  
  if(products){
    renderAllarVorur(document.body);
  }
  else if (id) {
    renderDetails(document.body, id);
  }
  else if(category){
    renderDistinctCategory(document.body, category);
  }
  
  else {
    renderFrontpage(document.body);
  }
}



// Bregst við því þegar við notum vafra til að fara til baka eða áfram.
window.onpopstate = () => {
  empty(document.body);
  route();
};

// Athugum í byrjun hvað eigi að birta.
route();