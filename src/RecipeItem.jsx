function RecipeItem(props) {
  const r = props.recipe;

  return (
    <article className="card">
      <div className="card-image">
        {r.image ? (
          <img
            src={r.image}
            alt={r.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span className="image-placeholder">🍽️</span>
        )}
        <span className="image-category">{r.category}</span>
      </div>

      <div className="card-body">
        <div className="card-title">
          <h3>{r.name}</h3>
        </div>

        <p className="description">{r.description}</p>

        <div className="ingredient-heading">Ingrédients</div>
        <div className="chips">
          {(r.ingredients || []).map((ing, index) => (
            <span key={index} className="chip">{ing}</span>
          ))}
        </div>

        <p className="difficulty">
          <strong>Difficulté :</strong> <span aria-label={`${r.difficulty} sur 5`}>{"★".repeat(Number(r.difficulty))}{"☆".repeat(5 - Number(r.difficulty))}</span>
        </p>
        <p className="date">Créée : {r.createdAt ? new Date(r.createdAt).toLocaleDateString("fr-FR") : "Aujourd'hui"}</p>

        <div className="card-buttons">
          <button className="btn-edit" onClick={() => props.onEdit(r)}>Modifier</button>
          <button className="btn-dup" onClick={() => props.onDuplicate(r)}>Dupliquer</button>
          <button className="btn-del" onClick={() => props.onDelete(r.id)}>Supprimer</button>
        </div>
      </div>
    </article>
  );
}

export default RecipeItem;
