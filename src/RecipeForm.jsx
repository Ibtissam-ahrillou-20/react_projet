import { useState } from "react";

function RecipeForm(props) {
    const categories = ["Entrée", "Plat", "Dessert", "Boisson"];
  const recipe = props.recipeToEdit;
  const isEdit = Boolean(recipe);
 
  const [name, setName] = useState(recipe ? recipe.name : "");
  const [category, setCategory] = useState(recipe ? recipe.category : "Plat");
  const [ingredients, setIngredients] = useState(
    recipe ? recipe.ingredients : [""]
  );
  const [difficulty, setDifficulty] = useState(recipe ? recipe.difficulty : 2);
  const [description, setDescription] = useState(
    recipe ? recipe.description : ""
  );
  const [image, setImage] = useState(recipe ? recipe.image : "");
 
  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };
 
  const updateIngredient = (index, value) => {
    setIngredients(ingredients.map((ing, i) => (i === index ? value : ing)));
  };
 
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((ing, i) => i !== index));
  };
 
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSave({
      id: recipe ? recipe.id : undefined,
      name: name,
      category: category,
      ingredients: ingredients.filter((ing) => ing.trim() !== ""),
      difficulty: Number(difficulty),
      description: description,
      image: image,
    });
  };
 
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{isEdit ? "Modifier la recette" : "Nouvelle recette"}</h2>
          <button type="button" onClick={props.onClose}>
            Fermer
          </button>
        </div>
 
        <form onSubmit={handleSubmit}>
          <label>Nom</label>
          <input
            type="text"
            placeholder="Ex: Pancakes maison"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
 
          <label>Catégorie</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
 
          <label>Ingrédients</label>
          {ingredients.map((ing, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="text"
                placeholder={"Ingrédient " + (index + 1)}
                value={ing}
                onChange={(e) => updateIngredient(index, e.target.value)}
              />
              <button type="button" onClick={() => removeIngredient(index)}>
                Suppr
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            + Ajouter ingrédient
          </button>
 
          <label>Difficulté : {difficulty}</label>
          <input
            type="range"
            min="1"
            max="5"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
 
          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
 
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImage} />
 
          <div className="form-actions">
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={props.onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default RecipeForm;