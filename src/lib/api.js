
/**
 * Sækjum týpurnar okkar.
 * @typedef {import('./api.types.js').Products} products
 * 
 */


/** Grunnslóð á API */
const API_URL = 'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/';

/**
 * Skilar Promise sem bíður í gefnar millisekúndur.
 * @param {number} ms Tími til að sofa í millisekúndum.
 * @returns {Promise<void>}
 */
export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}
/**
 * Leita í vefsíðu API eftir leitarstreng.
 * @returns {Promise<products[] | null>} Fylki af geimskotum eða `null` ef villa
 *  kom upp.
 */
export async function mainPageProducts() {
  const url = new URL('products?limit=6', API_URL);
  url.searchParams.set('items', '');

  // await sleep(1000);

  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja gögn', e);
    return null;
  }

  if (!response.ok) {
    console.error('Fékk ekki 200 status frá API', response);
    return null;
  }

  // Smá varkárni: gerum ekki ráð fyrir að API skili alltaf
  // réttum gögnum, en `json()` skilar alltaf *öllu* með `any`
  // týpunni sem er of víðtæk til að vera gagnleg.
  // (en hvað ef gögnin eru ekki eins og týpan??)
  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error('Villa við að lesa gögn', e);
    return null;
  }
  
  
  const results = data?.items ?? [];

  return results;
}

export async function mainPageCategories() {
  const url = new URL('/categories', API_URL);
  url.searchParams.set('items', '');

  await sleep(1000);

  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja gögn', e);
    return null;
  }

  if (!response.ok) {
    console.error('Fékk ekki 200 status frá API', response);
    return null;
  }

  // Smá varkárni: gerum ekki ráð fyrir að API skili alltaf
  // réttum gögnum, en `json()` skilar alltaf *öllu* með `any`
  // týpunni sem er of víðtæk til að vera gagnleg.
  // (en hvað ef gögnin eru ekki eins og týpan??)
  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error('Villa við að lesa gögn', e);
    return null;
  }
  
  
  const results = data?.items ?? [];
  
  return results;
}

export async function getAllProducts() {
  const url = new URL(`/products`, API_URL);
  url.searchParams.set('items', '');
  
  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja gögn', e);
    return null;
  }

  if (!response.ok) {
    console.error('Fékk ekki 200 status frá API', response);
    return null;
  }

  // Smá varkárni: gerum ekki ráð fyrir að API skili alltaf
  // réttum gögnum, en `json()` skilar alltaf *öllu* með `any`
  // týpunni sem er of víðtæk til að vera gagnleg.
  // (en hvað ef gögnin eru ekki eins og týpan??)
  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error('Villa við að lesa gögn', e);
    return null;
  }
  
  
  const results = data?.items ?? [];
  
  return results;
}



/**
 * Skilar stakri vöru eftir auðkenni eða `null` ef ekkert fannst.
 * @param {string} id Auðkenni vöru.
 * @returns {Promise<products | null>} Vara.
 */
export async function getProduct(id) {
  const url = new URL(`/products/${id}`, API_URL);

  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja gögn um vöru', e);
    return null;
  }

  if (!response.ok) {
    console.error('Fékk ekki 200 status frá API fyrir vöru', response);
    return null;
  }

  
  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error('Villa við að lesa gögn um vöru', e);
    return null;
  }

  return data;
}


export async function getCategory(id) {
  const url = new URL(`/products?category=${id}`, API_URL);
  url.searchParams.set('items', '');

  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja gögn um vöru', e);
    return null;
  }

  if (!response.ok) {
    console.error('Fékk ekki 200 status frá API fyrir vöru', response);
    return null;
  }

  
  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error('Villa við að lesa gögn um vöru', e);
    return null;
  }
  const results = data?.items ?? [];

  return results;
}

export async function moreProducts(category_id) {
  const url = new URL(`/products?limit=3&category=${category_id}`, API_URL);

  
  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja gögn um vöru', e);
    return null;
  }

  if (!response.ok) {
    console.error('Fékk ekki 200 status frá API fyrir vöru', response);
    return null;
  }

  
  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error('Villa við að lesa gögn um vöru', e);
    return null;
  }
  const results = data?.items ?? [];

  return results;
}