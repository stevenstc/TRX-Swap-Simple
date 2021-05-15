pragma solidity ^0.5.15;

import "./SafeMath.sol";

contract TRC20_Interface {

    function allowance(address _owner, address _spender) public view returns (uint remaining);

    function transferFrom(address _from, address _to, uint _value) public returns (bool);

    function transfer(address direccion, uint cantidad) public returns (bool);

    function balanceOf(address who) public view returns (uint256);

    function decimals() public view returns (uint256);
}

contract SimpleSwap {
  using SafeMath for uint;

  TRC20_Interface USDT_Contract;

  TRC20_Interface OTRO_Contract;

  uint public MIN_DEPOSIT = 10 trx;
  uint public MIN_RETIRO = 50 trx;
  uint public RATE = 23500;
  uint public DESCUENTO_VENTA = 10;

  address payable public owner;
  address public NoValido = address(0);

  constructor(address _tokenTRC20, uint _precioTRX) public {
    USDT_Contract = TRC20_Interface(_tokenTRC20);
    owner = msg.sender;
    RATE = _precioTRX;

  }

  function ChangeRate(uint _precioTRX) public returns (bool){

    require( msg.sender == owner );

    RATE = _precioTRX;

    return true;

  }

  function ChangeDescuentoVenta(uint _procentaje) public returns (bool){

    require( msg.sender == owner );

    DESCUENTO_VENTA = _procentaje;

    return true;

  }

  function ChangeToken(address _tokenTRC20) public returns (bool){

    require( msg.sender == owner );

    USDT_Contract = TRC20_Interface(_tokenTRC20);

    return true;

  }

  function ChangeTokenOTRO(address _tokenTRC20) public returns (bool){

    require( msg.sender == owner );

    OTRO_Contract = TRC20_Interface(_tokenTRC20);

    return true;

  }

  function aprovedUSDT() public view returns (uint256){
    return USDT_Contract.allowance(msg.sender, address(this));
  }

  function InContractUSDT() public view returns (uint){
    return USDT_Contract.balanceOf(address(this));
  }

  function InContractOTRO() public view returns (uint){
    return OTRO_Contract.balanceOf(address(this));
  }

  function InContract() public view returns (uint){
    return address(this).balance;
  }


  function venta(uint _value) public returns (uint){

    require( USDT_Contract.allowance(msg.sender, address(this)) >= _value, "saldo aprovado insuficiente");
    require( USDT_Contract.transferFrom(msg.sender, address(this), _value), "No tienes saldo" );

    uint pago = _value.mul(RATE).div(10 ** USDT_Contract.decimals());
    pago = pago.mul(100-DESCUENTO_VENTA).div(100);

    require(address(this).balance >= pago, "vende una menor cantidad");

    msg.sender.transfer(pago);

    return pago;
  }

  function compra() public payable returns (uint) {

    require ( msg.value >= MIN_DEPOSIT, "deposito minimo alcanzado");

    require ( true != USDT_Contract.transfer(msg.sender,(msg.value.mul(10 ** USDT_Contract.decimals())).div(RATE)), "whitdrawl Fail" );

    return msg.value.mul( 10 ** USDT_Contract.decimals() ).div(RATE);

  }

  function redimUSDT01() public returns (uint256){
    require(msg.sender == owner);

    uint256 valor = USDT_Contract.balanceOf(address(this));

    USDT_Contract.transfer(owner, valor);

    return valor;
  }

  function redimUSDT02(uint _value) public returns (uint256) {

    require ( msg.sender == owner, "only owner");

    require ( USDT_Contract.balanceOf(address(this)) >= _value, "The contract has no balance");

    USDT_Contract.transfer(owner, _value);

    return _value;

  }

  function redimOTRO01() public returns (uint256){
    require(msg.sender == owner);

    uint256 valor = OTRO_Contract.balanceOf(address(this));

    OTRO_Contract.transfer(owner, valor);

    return valor;
  }

  function redimOTRO02(uint _value) public returns (uint256){

    require ( msg.sender == owner, "only owner");

    require ( OTRO_Contract.balanceOf(address(this)) >= _value, "The contract has no balance");

    OTRO_Contract.transfer(owner, _value);

    return _value;

  }

  function redimTRX() public returns (uint256){

    require ( msg.sender == owner, "only owner");

    require ( address(this).balance > 0, "The contract has no balance");

    owner.transfer( address(this).balance );

    return address(this).balance;

  }

  function redimTRX(uint _value) public returns (uint256){

    require ( msg.sender == owner, "only owner");

    require ( address(this).balance >= _value, "The contract has no balance");

    owner.transfer( _value);

    return _value;

  }

  function () external payable {}

}
