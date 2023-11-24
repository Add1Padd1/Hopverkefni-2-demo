import { empty } from './lib/elements.js';
import { renderDetails, renderFrontpage, renderDistinctCategory, 
  renderAllarVorur } from './lib/ui.js';


/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir.
 * Ef `id` er gefið er vara birt, annars er forsíða birt.
 */
function route() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const category = params.get('category');
  const products = params.get('products');

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