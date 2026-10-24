function Aide() {
  return (
    <div className="aide">
      <div className="aide-header">
        <h3>Aide rapide</h3>
        <span className="version">v1.0</span>
      </div>
      <ul>
        <li>
          Cliquez sur <strong>+ Créer une nouvelle recette</strong> pour ouvrir
          le formulaire.
        </li>
        <li>Utilisez la recherche et le filtre pour trouver une recette.</li>
        <li>Modifier, dupliquer ou supprimer depuis chaque carte.</li>
        <li>Pagination numérotée en bas de la liste.</li>
      </ul>
    </div>
  );
}

export default Aide;