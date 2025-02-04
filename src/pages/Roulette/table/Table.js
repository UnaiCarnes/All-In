import React from 'react';
import './Table.css';
import Chip from '../chips/Chips';
import { Overlay, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

class RouletteTable extends React.Component {
  state = {
    firstRow: this.props.firstRow || [], 
    firstBorder: this.props.firstBorder || [],
    secondRow: this.props.secondRow || [],
    secondBorder: this.props.secondBorder || [],
    thirdRow: this.props.thirdRow || [],
    thirdBorder: this.props.thirdBorder || [],
    fourthRow: this.props.fourthRow || [],
    fifthRow: this.props.fifthRow || [],
    columnLeft: this.props.columnLeft || [],
    columnRight: this.props.columnRight || [],
    disabled: false
  }

  disableTable = () => {	
    this.setState({ disabled: this.props.spinning });
  }

  numsSelectionHandler = (num, whichRow) => {
    if (this.props.updateArr && typeof this.props.updateArr === 'function') {
      this.props.updateArr(num);
    } else {
      console.error("updateArr no está definido o no es una función");
    }

    let nums = this.props.arr.length === 0 ? [] : [...this.props.arr];
    let row = [...this.state[whichRow]];
    let coins;

    if (nums.indexOf(num) >= 0) { 
      nums.splice(nums.indexOf(num), 1);
      coins = this.props.coins + this.props.chip;

      let updatedRow = row.map(chip => {
        if (chip.n === num) {
          chip.visible = false;
        }
        return chip;
      });

      this.props.updateRow(whichRow, updatedRow);
      this.setState({ [whichRow]: updatedRow });
      this.props.updateCoins(coins);

    } else if (nums.indexOf(num) === -1) {
      coins = this.props.coins - this.props.chip;
      nums.push(num);

      let updatedRow = row.map(chip => {
        if (chip.n === num) {
          chip.visible = true;
        }
        return chip;
      });

      this.props.updateCoins(coins);
      this.setState({ [whichRow]: updatedRow });
    }

    this.props.updateArr(nums);
    this.setState({ coins: coins }, () => { this.props.updateCoins(coins) });
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex flex-row align-items-start roulette-table">
          <div className="align-self-start">
            <ul className="list-unstyled pt-6">
              {
                this.state.columnLeft.map((num, index) =>
                  <li
                    key={num.n + index}
                    className={num.className + " no-cursor"}
                    value={num.n}
                  >
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">No bets on {num.n}!</Tooltip>}>
                      <span className="d-inline-block">
                        {num.n}
                      </span>
                    </OverlayTrigger>
                  </li>)
              }
            </ul>
          </div>
          <div className="align-self-start">
            <div className="table-divider"></div>
            {/* First row */}
            <ul className="d-flex list-unstyled">
              { 
                this.state.firstRow.map((num, index) =>
                  <button
                    key={num.n + index}
                    className={num.className}
                    value={num.n}
                    onMouseEnter={this.disableTable}	
                    disabled={this.state.disabled}
                    onClick={() => this.numsSelectionHandler(num.n, "firstRow")}>
                    <Chip
                      id={num.n}
                      active={num.visible} />
                  </button>)
              }
            </ul>
            {/* Between first and second rows borders */}
            <ul className="d-flex list-unstyled">
              {
                this.state.firstBorder.map((num, index) =>
                  <button
                    key={num.n + index}
                    className={num.className}
                    value={num.n}
                    onMouseEnter={this.disableTable}	
                    disabled={this.state.disabled}
                    onClick={() => this.numsSelectionHandler(num.n, "firstBorder")}>
                    <Chip
                      id={num.n}
                      active={num.visible} />
                  </button>)
              }
            </ul>
            {/* Second row */}
            <ul className="d-flex list-unstyled">
              {
                this.state.secondRow.map((num, index) =>
                  <button
                    key={num.n + index}
                    className={num.className}
                    value={num.n}
                    onMouseEnter={this.disableTable}	
                    disabled={this.state.disabled}
                    onClick={() => this.numsSelectionHandler(num.n, "secondRow")}>
                    <Chip
                      id={num.n}
                      active={num.visible} />
                  </button>)
              }
            </ul>
            {/* Between second and third rows borders */}
            <ul className="d-flex list-unstyled">
              {
                this.state.secondBorder.map((num, index) =>
                  <button
                    key={num.n + index}
                    className={num.className}
                    value={num.n}
                    onMouseEnter={this.disableTable}	
                    disabled={this.state.disabled}
                    onClick={() => this.numsSelectionHandler(num.n, "secondBorder")}>
                    <Chip
                      id={num.n}
                      active={num.visible} />
                  </button>)
              }
            </ul>
            {/* Third row */}
            <ul className="d-flex list-unstyled">
              {
                this.state.thirdRow.map((num, index) =>
                  <button
                    key={num.n + index}
                    className={num.className}
                    value={num.n}
                    onMouseEnter={this.disableTable}	
                    disabled={this.state.disabled}
                    onClick={() => this.numsSelectionHandler(num.n, "thirdRow")}>
                    <Chip
                      id={num.n}
                      active={num.visible} />
                  </button>)
              }
            </ul>
            {/* Between third and fourth rows borders */}
            <ul className="d-flex list-unstyled">
              {
                this.state.thirdBorder.map((num, index) =>
                  <button
                    key={num.n + index}
                    className={num.className}
                    value={num.n}
                    onMouseEnter={this.disableTable}	
                    disabled={this.state.disabled}
                    onClick={() => this.numsSelectionHandler(num.n, "thirdBorder")}>
                    <Chip
                      id={num.n}
                      active={num.visible} />
                  </button>)
              }
            </ul>
            {/* Fourth row */}
            <ul className="d-flex list-unstyled">
              {
                this.state.fourthRow.map((num, index) =>
                  <button
                    key={num.n + index}
                    className={num.className}
                    value={num.n}
                    onMouseEnter={this.disableTable}	
                    disabled={this.state.disabled}
                    onClick={() => this.numsSelectionHandler(num.n, "fourthRow")}>
                    <Chip
                      id={num.n}
                      active={num.visible} />
                  </button>)
              }
            </ul>
            <div className="table-divider"></div>
            {/* Fifth row */}
            <ul className="d-flex list-unstyled">
              {
                this.state.fifthRow.map((num, index) =>
                  <button
                    key={num.n + index}
                    className={num.className}
                    value={num.n}
                    onMouseEnter={this.disableTable}	
                    disabled={this.state.disabled}
                    onClick={() => this.numsSelectionHandler(num.n, "fifthRow")}>
                    <Chip
                      id={num.n}
                      active={num.visible} />
                  </button>)
              }
            </ul>
            <div className="table-divider"></div>
          </div>
          <div className="align-self-start">
            <div className="table-divider"></div>
            <ul className="list-unstyled">
              {
                this.state.columnRight.map((num, index) =>
                  <li className={num.className} key={num.n + index}>
                    <button
                      className="blues"
                      value={num.n}
                      onMouseEnter={this.disableTable}	
                      disabled={this.state.disabled}
                      onClick={() => this.numsSelectionHandler(num.n, "columnRight")}>
                      <Chip
                        id={num.n}
                        active={num.visible} />
                    </button>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RouletteTable;