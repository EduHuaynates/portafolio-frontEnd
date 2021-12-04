import "./skeleton.css";

export default function skeleton({ type }) {
  const SkeletonCard = () => (
    <div className="sk_entidad_container">
      <div className="sk_entidad_logo_container"></div>
      <div className="sk_entidad_main">
        <div className="sk_entidad_title">"Info"</div>
        <div className="sk_entidad_type">Type</div>
        <div className="sk_entidad_inversiones">35 inversiones realizadas</div>
      </div>
    </div>
  );
  return Array(12).fill(<SkeletonCard />);
}
