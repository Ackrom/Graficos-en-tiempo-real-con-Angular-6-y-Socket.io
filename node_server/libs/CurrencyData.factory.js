class CurrencyDataFactory{
  
  constructor(bdf){
    this.bdf = bdf;
    this.today = new Date();
    this.currencyData;
  }


  getCurrencyData(){
    let output = [];
    for (let i = 0; i < this.bdf.length; i++) {
      let data = {
        name:this.bdf[i].name,
        price:Math.floor(Math.random()*this.bdf[i].range[1])+this.bdf[i].range[0],
        date:this.addHours(this.today,1)
      }
      output.push(data);
    }
    this.today = this.addHours(this.today,1);
    this.currencyData = output;
    return output;
  }

  getACurrency(name){
    if(!this.currencyData)
      return;
    
    for (const value of this.currencyData) {
      if(value.name == name)
        return [value];
    }
  }

  addHours(startDate, numberOfHours){
    return new Date(startDate.getTime() + (numberOfHours * 3.6*Math.pow(10,6)));
  }
  addDays(startDate, numberOfDays) {
    return new Date(startDate.getTime() + (numberOfDays * 24 *60 * 60 * 1000));
  }

}


module.exports = function(bdf){
  return new CurrencyDataFactory(bdf);
}