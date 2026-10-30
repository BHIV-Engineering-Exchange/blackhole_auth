const AppCard = ({ app, onLaunch, disabled, launching }) => (
  <article className="app-card">
    <h3>{app.name}</h3>
    <p>{app.description}</p>
    <button
      type="button"
      onClick={() => onLaunch(app)}
      disabled={disabled}
    >
      {launching ? "Launching…" : disabled ? "Please wait…" : "Open App"}
    </button>
  </article>
);

export default AppCard;
