export default function GetCategories(props) {
    return(
     <div className="categorySection">
       {props.array.map((category) => (
         <button style={{width: "100%"}} className="categoryDisplay" key={category.id}>
           {category.name}
         </button>
       ))}
     </div>
    );
}