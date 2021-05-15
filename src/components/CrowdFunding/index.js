import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

//import cons from "../../cons.js";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: 10
    };

    this.compra = this.compra.bind(this);
    this.estado = this.estado.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    this.estado();
    setInterval(() => this.estado(), 3 * 1000);
  }

  async estado() {
    var accountAddress = await window.tronWeb.trx.getAccount();
    accountAddress = window.tronWeb.address.fromHex(accountAddress.address);

    var inicio = accountAddress.substr(0, 4);
    var fin = accountAddress.substr(-4);

    var texto = inicio + "..." + fin;

    document.getElementById("login").innerHTML =
      '<a href="https://tronscan.io/#/address/' +
      accountAddress +
      '" class="nav-link js-scroll-trigger">' +
      texto +
      "</a>";

    var min = 10;
    /*

    var tronUSDT = await window.tronWeb;
    var contractUSDT = await tronUSDT.contract().at(cons.USDT);

    var aprovado = await contractUSDT
      .allowance(accountAddress, contractAddress)
      .call();
    aprovado = parseInt(aprovado.remaining._hex);

    */

    var rate = await Utils.contract.RATE().call();

    this.setState({
      min: min,
      rate: rate / 1000000
    });

    //console.log(min);
  }

  async compra() {
    const { min } = this.state;

    var amount = document.getElementById("amount").value;
    amount = parseFloat(amount);
    amount = parseInt(amount * 1000000);

    var aprovado = await window.tronWeb.trx.getBalance();
    console.log(aprovado);
    console.log(amount);

    /*
    var tronUSDT = await window.tronWeb;
    var contractUSDT = await tronUSDT.contract().at(cons.USDT);

    var accountAddress = await window.tronWeb.trx.getAccount();
    accountAddress = window.tronWeb.address.fromHex(accountAddress.address);

    var aprovado = await contractUSDT
      .allowance(accountAddress, contractAddress)
      .call();
    aprovado = parseInt(aprovado.remaining._hex);

    */

    if (aprovado >= amount) {
      if (amount >= min * 1000000) {
        document.getElementById("amount").value = "";

        await Utils.contract.compra().send({ callValue: amount });
        window.alert(
          "Felicidades compraste: " +
            parseInt((amount / this.state.rate) * 100) / 100000000 +
            " LCN"
        );
      } else {
        window.alert("Please enter an amount greater than 10 TRX");
        document.getElementById("amount").value = 10;
      }
    } else {
      if (amount > 10 && aprovado > 10) {
        /*
        if (aprovado <= 0) {
          await contractUSDT
            .approve(
              contractAddress,
              "115792089237316195423570985008687907853269984665640564039457584007913129639935"
            )
            .send();
        }
        */

        if (amount > aprovado) {
          if (aprovado <= 0) {
            document.getElementById("amount").value = 10;
            window.alert(
              "You do not have enough funds in your account you place at least 10 TRX"
            );
          } else {
            document.getElementById("amount").value = 10;
            window.alert(
              "You must leave TRX free in your account to make the transaction"
            );
          }
        } else {
          document.getElementById("amount").value = amount;
          window.alert(
            "You must leave TRX free in your account to make the transaction"
          );
        }
      } else {
        window.alert(
          "You do not have enough funds in your account you place at least 10 TRX"
        );
      }
    }
  }

  render() {
    var { min } = this.state;

    min = "Min. " + min + " TRX";

    return (
      <div>
        <div className="form-group text-center">
          <p className="card-text">1 LCN = {this.state.rate} TRX</p>
          <input
            type="number"
            className="form-control mb-20 text-center"
            id="amount"
            placeholder={min}
          ></input>
          <p className="card-text">Debes tener TRX para hacer la transacción</p>

          <a
            href="#root"
            className="btn btn-outline-light py-3 px-4 rounded-pill js-scroll-trigger"
            onClick={() => this.compra()}
          >Comprar</a>
        </div>
      </div>
    );
  }
}
