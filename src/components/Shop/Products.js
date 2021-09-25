import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const DUMMY_ITEMS=[
    {id:'p1',price:15,title:'My First Book',description:'First book i ever wrote'},
    {id:'p2',price:20,title:'My Second Book', description:'Second book i ever wrote'}
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_ITEMS.map(item=>{
         return <ProductItem
         key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
          />
        })}
       
      </ul>
    </section>
  );
};

export default Products;
