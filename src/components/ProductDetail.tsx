import { motion, useReducedMotion } from 'motion/react'
import { useState, type CSSProperties } from 'react'
import { useCart } from '../cart'
import { FloatingMusicControl } from './AmbientSound'

type Product = { slug: string; number: string; name: string; moment: string; line: string; story: string; image: string; price: string; burn: string; color: string; glow: string; notes: { stage: string; name: string; detail: string }[] }

const products: Product[] = [
  { slug: 'embera', number: '01', name: 'Embera', moment: 'Golden hour', line: 'The warmth that stays.', story: 'Amber resin and smoked vanilla settle into bitter orange—a slow, glowing composition for the hour when the room becomes yours again.', image: '/assets/collection-embera.png', price: '$48', burn: '60 hours', color: '#b96b38', glow: '#e6a164', notes: [{ stage: 'Opening', name: 'Bitter orange', detail: 'Bright, dry citrus peel' }, { stage: 'Heart', name: 'Smoked vanilla', detail: 'Soft warmth without sweetness' }, { stage: 'Base', name: 'Amber resin', detail: 'Golden, mineral depth' }] },
  { slug: 'solis', number: '02', name: 'Solis', moment: 'Morning light', line: 'Open the windows.', story: 'Bergamot, green fig, and pale cedar move through the room like the first clear light of morning—fresh, quiet, and full of possibility.', image: '/assets/collection-solis.png', price: '$44', burn: '55 hours', color: '#c99345', glow: '#f0c875', notes: [{ stage: 'Opening', name: 'Bergamot', detail: 'Clear and gently sparkling' }, { stage: 'Heart', name: 'Green fig', detail: 'Leafy, milky freshness' }, { stage: 'Base', name: 'Pale cedar', detail: 'Clean, sun-warmed wood' }] },
  { slug: 'velour', number: '03', name: 'Velour', moment: 'Slow evening', line: 'Softness, made visible.', story: 'Velvet rose folds into sandalwood and tonka bean. Intimate without becoming heavy, it gives the edges of the evening somewhere soft to land.', image: '/assets/collection-velour.png', price: '$52', burn: '65 hours', color: '#81303b', glow: '#c86f69', notes: [{ stage: 'Opening', name: 'Velvet rose', detail: 'Dark petals, softly spiced' }, { stage: 'Heart', name: 'Sandalwood', detail: 'Creamy and close to skin' }, { stage: 'Base', name: 'Tonka bean', detail: 'Dry almond warmth' }] },
  { slug: 'nocturne', number: '04', name: 'Nocturne', moment: 'After dark', line: 'Leave one light burning.', story: 'Black tea, incense, and charred cedar compose the deepest candle in the collection—a magnetic final light for rooms that are not ready to sleep.', image: '/assets/collection-nocturne.png', price: '$56', burn: '70 hours', color: '#403042', glow: '#9d6e8f', notes: [{ stage: 'Opening', name: 'Black tea', detail: 'Dry leaves and quiet smoke' }, { stage: 'Heart', name: 'Incense', detail: 'Mineral, cool, contemplative' }, { stage: 'Base', name: 'Charred cedar', detail: 'Dark wood and lasting warmth' }] },
]

const getProduct = () => products.find(({ slug }) => window.location.pathname.endsWith(slug)) ?? products[0]

const vessels = [
  { name: 'Ribbed amber', color: '#74401f', edge: '#d3904e', radius: '14px 14px 34px 34px', image: '/assets/vessel-amber-cutout.png', price: 0 },
  { name: 'Smoke glass', color: '#302c2c', edge: '#80736e', radius: '8px 8px 28px 28px', image: '/assets/vessel-smoke-cutout.png', price: 4 },
  { name: 'Porcelain', color: '#d9cec0', edge: '#f2e9df', radius: '42px 42px 24px 24px', image: '/assets/vessel-porcelain-cutout.png', price: 8 },
  { name: 'Burgundy', color: '#681e32', edge: '#bd6675', radius: '18px 18px 30px 30px', image: '/assets/vessel-burgundy-cutout.png', price: 7 },
]

const scentEditions: Record<string, { name: string; mood: string; notes: string; price: number }[]> = {
  embera: [{ name: 'Original', mood: 'Warm & resinous', notes: 'Orange / Vanilla / Amber', price: 0 }, { name: 'Spiced', mood: 'Deeper & drier', notes: 'Cinnamon / Cedar / Amber', price: 3 }, { name: 'Velvet', mood: 'Soft & intimate', notes: 'Rose / Vanilla / Sandalwood', price: 5 }],
  solis: [{ name: 'Original', mood: 'Clear & green', notes: 'Bergamot / Fig / Cedar', price: 0 }, { name: 'Citrus', mood: 'Bright & sparkling', notes: 'Neroli / Lemon / Vetiver', price: 3 }, { name: 'Garden', mood: 'Fresh & botanical', notes: 'Fig leaf / Basil / Moss', price: 5 }],
  velour: [{ name: 'Original', mood: 'Soft & floral', notes: 'Rose / Sandalwood / Tonka', price: 0 }, { name: 'Petal', mood: 'Airy & romantic', notes: 'Peony / Rosewater / Musk', price: 3 }, { name: 'Suede', mood: 'Dark & tactile', notes: 'Saffron / Suede / Tonka', price: 6 }],
  nocturne: [{ name: 'Original', mood: 'Dark & smoky', notes: 'Black tea / Incense / Cedar', price: 0 }, { name: 'Midnight', mood: 'Cool & mineral', notes: 'Juniper / Slate / Smoke', price: 4 }, { name: 'Library', mood: 'Dry & contemplative', notes: 'Paper / Leather / Cedar', price: 6 }],
}

const ingredientOptions: Record<string, { name: string; tone: string; price: number }[]> = {
  embera: [{ name: 'Orange peel', tone: '#d7862e', price: 2 }, { name: 'Vanilla pod', tone: '#4e2c20', price: 3 }, { name: 'Cinnamon bark', tone: '#9d5030', price: 2 }, { name: 'Rose petal', tone: '#8e2e3f', price: 3 }],
  solis: [{ name: 'Bergamot peel', tone: '#d7a835', price: 2 }, { name: 'Green fig', tone: '#748344', price: 3 }, { name: 'Fig leaf', tone: '#435c35', price: 2 }, { name: 'Neroli petal', tone: '#e6d7af', price: 3 }],
  velour: [{ name: 'Velvet rose', tone: '#7e2438', price: 3 }, { name: 'Tonka bean', tone: '#4c3026', price: 2 }, { name: 'Saffron', tone: '#c05b31', price: 4 }, { name: 'Sandalwood', tone: '#b98b64', price: 3 }],
  nocturne: [{ name: 'Black tea', tone: '#322820', price: 2 }, { name: 'Cedar chip', tone: '#6c4630', price: 3 }, { name: 'Juniper', tone: '#394b43', price: 3 }, { name: 'Incense resin', tone: '#8b684c', price: 4 }],
}

export function ProductDetail() {
  const { addItem, count } = useCart()
  const product = getProduct()
  const reduceMotion = useReducedMotion()
  const initialVessel = { embera: 0, solis: 2, velour: 3, nocturne: 1 }[product.slug] ?? 0
  const [vesselIndex, setVesselIndex] = useState(initialVessel)
  const [scentIndex, setScentIndex] = useState(0)
  const [size, setSize] = useState<220 | 420>(220)
  const [ingredients, setIngredients] = useState<string[]>([])
  const vessel = vessels[vesselIndex]
  const scent = scentEditions[product.slug][scentIndex]
  const ingredientTotal = ingredientOptions[product.slug].filter((item) => ingredients.includes(item.name)).reduce((sum, item) => sum + item.price, 0)
  const total = Number(product.price.slice(1)) + vessel.price + scent.price + ingredientTotal + (size === 420 ? 18 : 0)
  const toggleIngredient = (name: string) => setIngredients((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  const studioStyle = { '--jar': vessel.color, '--jar-edge': vessel.edge, '--jar-radius': vessel.radius } as CSSProperties
  const addComposition = () => {
    addItem({ slug: product.slug, name: product.name, moment: product.moment, vessel: vessel.name, scent: scent.name, ingredients, size, price: total, image: vessel.image, color: product.color })
    window.location.href = '/cart'
  }

  return <main className={`product-page product-${product.slug}`} style={{ '--product': product.color, '--product-glow': product.glow } as CSSProperties}>
    <FloatingMusicControl />
    <header className="product-nav"><a className="product-brand" href="/">Embera <span>Candle Atelier</span></a><nav><a href="/#collection">Collection</a><a href="/#journal">Journal</a><a className="product-bag" href="/cart">Bag / {count}</a></nav></header>

    <section id="purchase" className="product-studio" aria-labelledby="product-title" style={studioStyle}>
      <div className="studio-intro"><p className="product-kicker">Compose No. {product.number}</p><h1 id="product-title">{product.name}<i>.</i></h1><p>{product.line}</p></div>
      <div className="studio-stage" aria-live="polite">
        <div className="studio-orbit orbit-one" /><div className="studio-orbit orbit-two" />
        <motion.img className="studio-ingredient-spill" key={product.slug} src={`/assets/ingredients-${product.slug}.png`} alt={`${product.name} fragrance ingredients`} initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} />
        <motion.div className="studio-candle-photo" key={vessel.image} initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.55 }}><img src={vessel.image} alt="" /><div className="studio-photo-label"><span>{product.number}</span><strong>{product.name}</strong><small>{scent.name} edition</small></div></motion.div>
        <div className="studio-added-ingredients">{ingredientOptions[product.slug].filter((item) => ingredients.includes(item.name)).map((item, index) => <motion.span key={item.name} initial={reduceMotion ? false : { opacity: 0, scale: 0.6, y: -18 }} animate={{ opacity: 1, scale: 1, y: 0 }} style={{ '--ingredient': item.tone, '--ingredient-index': index } as CSSProperties}><i />{item.name}</motion.span>)}</div>
      </div>

      <div className="studio-controls">
        <div className="studio-control-group"><header><span>01</span><div><p>Choose the vessel</p><small>{vessel.name}</small></div></header><div className="vessel-options">{vessels.map((item, index) => <button key={item.name} className={index === vesselIndex ? 'is-active' : ''} onClick={() => setVesselIndex(index)} type="button" aria-label={item.name}><i style={{ background: item.color, borderColor: item.edge, borderRadius: item.radius }} /><span>{item.name === 'Ribbed amber' ? 'Amber' : item.name === 'Smoke glass' ? 'Smoke' : item.name}</span></button>)}</div></div>
        <div className="studio-control-group"><header><span>02</span><div><p>Tune the scent</p><small>Blended for {product.name}</small></div></header><div className="scent-options">{scentEditions[product.slug].map((item, index) => <button key={item.name} className={index === scentIndex ? 'is-active' : ''} onClick={() => setScentIndex(index)} type="button"><span>{item.name}</span><small>{item.mood}</small></button>)}</div></div>
        <div className="studio-control-group ingredient-group"><header><span>03</span><div><p>Add ingredients</p><small>Choose the notes you want to see</small></div></header><div className="ingredient-options">{ingredientOptions[product.slug].map((item) => { const selected = ingredients.includes(item.name); return <button key={item.name} className={selected ? 'is-active' : ''} onClick={() => toggleIngredient(item.name)} type="button"><i style={{ background: item.tone }} /><span>{item.name}</span><small>{selected ? 'Added' : `+$${item.price}`}</small></button> })}</div></div>
        <div className="studio-summary"><div><small>Your composition</small><p>{vessel.name} / {scent.name}</p></div><div className="studio-size"><small>Size</small><button className={size === 220 ? 'is-active' : ''} onClick={() => setSize(220)} type="button">220g</button><button className={size === 420 ? 'is-active' : ''} onClick={() => setSize(420)} type="button">420g</button></div><strong>${total}</strong><button type="button" onClick={addComposition}>Add composition <span>→</span></button><small className="studio-shipping">Complimentary shipping within Egypt</small></div>
      </div>
    </section>

    <section id="composition" className="product-composition"><header><p className="product-kicker">The composition</p><h2>Three notes.<br /><i>One atmosphere.</i></h2></header><div className="product-notes">{product.notes.map((note, index) => <motion.article key={note.name} initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: index * 0.1 }}><span>0{index + 1}</span><p>{note.stage}</p><h3>{note.name}</h3><small>{note.detail}</small></motion.article>)}</div></section>

    <section className="product-ritual"><div className="product-ritual-image"><img src={`/assets/detail-${product.slug}.png`} alt={`${product.name} candle with its fragrance materials`} /></div><motion.div className="product-ritual-copy" initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}><p className="product-kicker">The first burn</p><h2>Let the wax reach<br /><i>every edge.</i></h2><p>On the first light, allow the entire surface to melt. The candle will remember the shape of this burn and return to it each evening.</p><dl><div><dt>Burn time</dt><dd>{product.burn}</dd></div><div><dt>Wax</dt><dd>Coconut + soy</dd></div><div><dt>Wick</dt><dd>Lead-free cotton</dd></div><div><dt>Weight</dt><dd>220g / 7.8oz</dd></div></dl></motion.div></section>

    <section className="product-next"><p>Continue through the collection</p><div>{products.filter(({ slug }) => slug !== product.slug).map((item) => <a key={item.slug} href={`/products/${item.slug}`}><span>{item.number}</span>{item.name}<i>↗</i></a>)}</div></section>
    <footer className="product-footer"><a href="/">Embera</a><p>© 2026 Toqa ElQersh. All rights reserved.</p></footer>
  </main>
}
