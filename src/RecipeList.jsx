import RecipeItem from "./RecipeItem";

function RecipeList(props) {
  if (props.recipes.length === 0) {
    return <p className="empty">Aucune recette trouvée.</p>;
  }

  return (
    <div className="recipe-list">
      {props.recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onEdit={props.onEdit}
          onDuplicate={props.onDuplicate}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  );
}

export default RecipeList;