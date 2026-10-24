
function RecipeFilter(props) {
  return (
    <div className="recipe-filter">
      <input
        type="text"
        placeholder="Rechercher..."
        value={props.search}
        onChange={(e) => props.onSearchChange(e.target.value)}
      />

      <select
        value={props.category}
        onChange={(e) => props.onCategoryChange(e.target.value)}
      >
        <option value="all">Toutes catégories</option>
        <option value="Entrée">Entrée</option>
        <option value="Plat">Plat</option>
        <option value="Dessert">Dessert</option>
        <option value="Boisson">Boisson</option>
      </select>
    </div>
  );
}

export default RecipeFilter;