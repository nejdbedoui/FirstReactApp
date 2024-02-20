import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './toolBarcss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold,faItalic,faAlignLeft,faAlignCenter,faAlignRight,faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import './css.css';
function ToolBar() {
  
  return (
    <div className="container">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-light btn-sm">
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button type="button" className="btn btn-light btn-sm">
        <FontAwesomeIcon icon={faItalic} />
        </button>
        <button type="button" className="btn btn-light btn-sm">
        <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button type="button" className="btn btn-light btn-sm">
        <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button type="button" className="btn btn-light btn-sm">
        <FontAwesomeIcon icon={faAlignRight} />
        </button>
        <button type="button" className="btn btn-light btn-sm">
        <FontAwesomeIcon icon={faAlignJustify} />
        </button>
       
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
      <select class="form-control form-control-sm">
            <option>8 pt</option>
            <option>10 pt</option>
            <option>12 pt</option>
            <option>14 pt</option>
            <option>18 pt</option>
            <option>24 pt</option>
            <option>36 pt</option>
        </select>
        </div>

       
    </div>
  );
}

export default ToolBar;