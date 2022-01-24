//STYLES
import "./toggleSwitch.css";

//HOOKS
import { useState } from "react";

//UTILS
import { notify } from "../../utils/notify";
import { updateProject } from "../../utils/apiCalls/project.call";

export default function ToggleSwitch({ projectId, initialState }) {
  console.log(initialState, "toggled1");
  const [toggled, setToggled] = useState(initialState);
  console.log(toggled, "toggled");

  const onChange = (e) => {
    console.log(e.target.checked, "aswithc");
    setToggled(e.target.checked);
    const PromiseToUpdate = updateProject(projectId, {
      estado: e.target.checked,
    });
    notify(PromiseToUpdate, "Se cambio el estado del Proyecto");
  };

  return (
    <label className="Toggle Wrapper">
      <input
        className="Toggle_Check"
        type="checkbox"
        checked={toggled}
        onChange={onChange}
      />
      <span className="Toggle_Slider"></span>
    </label>
  );
}
