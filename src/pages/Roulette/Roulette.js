import React from 'react';
import Weel from './weel/Weel';
import RouletteTable from './table/Table';
import { GiDiamonds } from 'react-icons/gi';
import firstRow from './table/rows/FirstRow.json';
import firstBorder from './table/rows/FirstBorder.json';
import secondRow from './table/rows/SecondRow.json';
import secondBorder from './table/rows/SecondBorder.json';
import thirdRow from './table/rows/ThirdRow.json';
import thirdBorder from './table/rows/ThirdBorder.json';
import fourthRow from './table/rows/FourthRow.json';
import fifthRow from './table/rows/FifthRow.json';
import columnLeft from './table/rows/ColumnLeft.json';
import columnRight from './table/rows/ColumnRight.json';

class Roulette extends React.Component {
  state = {
    num: "",
    arr: [],
    count: 0,
    wins: 0,
    chip: 10,
    coins: 100000,
    losses: 0,
    spinning: false,
    message: "Put your bets and spin the wheel!",
    firstRow, firstBorder, secondRow, secondBorder, thirdRow, thirdBorder, fourthRow, fifthRow, columnLeft, columnRight
  };

  updateArr = (number) => {
    this.setState((prevState) => ({
      arr: [...prevState.arr, number],
    }));
  };

  updateNum = (newNum) => {
    this.setState({ num: newNum });
  };

  updateCoins = (newCoins) => {
    this.setState({ coins: newCoins });
  };

  render() {
    return (
      <div className="container mx-auto p-40">
        <div className="flex justify-center pt-2">
        </div>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="mx-5">
            <RouletteTable 
              arr={this.state.arr} 
              updateArr={this.updateArr}
              updateCoins={this.updateCoins}
              firstRow={this.state.firstRow}
              firstBorder={this.state.firstBorder}
              secondRow={this.state.secondRow}
              secondBorder={this.state.secondBorder}
              thirdRow={this.state.thirdRow}
              thirdBorder={this.state.thirdBorder}
              fourthRow={this.state.fourthRow}
              fifthRow={this.state.fifthRow}
              columnLeft={this.state.columnLeft}
              columnRight={this.state.columnRight}
            />
            <div className="bg-red-500 text-white p-4 flex items-center justify-between">
              <div className="text-2xl">${this.state.coins}</div>
              <div className="text-center">
                <h6 className="uppercase">{this.state.message}</h6>
                <div className="flex justify-center">
                  <GiDiamonds className="text-yellow-300" />
                </div>
                <ul className="flex space-x-4">
                  <li>Spins: {this.state.count}</li>
                  <li>Wins: {this.state.wins}</li>
                  <li>Losses: {this.state.losses}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Weel isSpinning={this.state.spinning} updateNum={this.updateNum} />
          </div>
        </div>
      </div>
    );
  }
}

export default Roulette;
