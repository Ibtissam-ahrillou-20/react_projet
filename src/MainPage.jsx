import { useState } from "react";
import { initialRecipes } from "./Recipes";
import RecipeFilter from "./RecipeFilter";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import Pagination from "./Pagination";
import Aide from "./Aide";

const PER_PAGE = 6;

function MainPage() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  // --- Filtre + pagination (calculés à chaque rendu) ---
  const filteredRecipes = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || r.category === category)
  );
  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / PER_PAGE));
  const page = Math.min(currentPage, totalPages); // évite une page inexistante
  const pageRecipes = filteredRecipes.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  // --- Modale ---
  const openCreate = () => {
    setRecipeToEdit(null);
    setShowForm(true);
  };

  const openEdit = (recipe) => {
    setRecipeToEdit(recipe);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setRecipeToEdit(null);
  };

  // --- CRUD ---
  const handleSave = (recipe) => {
    if (recipe.id) {
      // modification
      setRecipes(recipes.map((r) => (r.id === recipe.id ? recipe : r)));
    } else {
      // création
      const newRecipe = {
        ...recipe,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setRecipes([...recipes, newRecipe]);
    }
    closeForm();
  };

  const handleDuplicate = (recipe) => {
    const copy = {
      ...recipe,
      id: Date.now(),
      name: recipe.name + " (copie)",
      createdAt: new Date().toISOString(),
    };
    setRecipes([...recipes, copy]);
  };

  const handleDelete = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  return (
    <div className="main-page">
      <header className="top-bar">
        <h1>🍽️ Creative Recipe Builder</h1>
        <div className="top-actions">
          <RecipeFilter
            search={search}
            onSearchChange={handleSearch}
            category={category}
            onCategoryChange={handleCategory}
          />
          <button className="btn-create" onClick={openCreate}>
            + Créer une nouvelle recette
          </button>
        </div>
      </header>

      <div className="content">
        <div className="left">
          <RecipeList
            recipes={pageRecipes}
            onEdit={openEdit}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <Aide />
      </div>

      {showForm && (
        <RecipeForm
          recipeToEdit={recipeToEdit}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
    </div>
  );
}

export default MainPage;