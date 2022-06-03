const taxsMax = [250000, 500000, 1200000, 2800000, 5000000, 8400000];
const taxsPercent = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35];
const taxLevel = [0,5000000,10000000,18000000,32000000,52000000,80000000]

const minReduce = 11000000;
const perDependent = 4400000;

const BHXHMax = 2384000;
const BHXHPercent = 0.08;
const BHYTMax = 447000;
const BHYTPercent= 0.015;
const BHTNMax = [884000, 784000, 686000, 614000];
const BHTNPercent = 0.01;

function TaxLevel(taxable, levels) {

    for (let i=levels.length-1; i>=0 ; i--)
    {
        if (taxable > levels[i])
            return i+1;
    }
    return 0;
}

function Insurance(Gross, MaxInsurance, Percent) {
    if (Gross*Percent > MaxInsurance)
        return MaxInsurance;
    return Gross * Percent;
};

function Taxable (Income, Reduce, Dependent, perDependent) {
    const taxable = Income - Reduce - Dependent*perDependent;
    if(taxable > 0)
        return taxable;
    return 0;
};

function Tax (taxable, levels, taxmaxs, taxpercent) {
    let tax=0;
    const level = TaxLevel(taxable, levels) -1;

    for (let i =0; i< level ; i++)
    {
        tax += taxmaxs[i];
    }
    tax += (taxable - levels[level])*taxpercent[level]
    return tax;
}


function GrossToNetCalculate (Gross, Area, Dependent) {

    const BHXH = Insurance(Gross, BHXHMax, BHXHPercent);
    const BHYT = Insurance(Gross, BHYTMax, BHYTPercent);

    const area = parseInt(Area) -1;
    const BHTN = Insurance(Gross, BHTNMax[area], BHTNPercent);

    const income = Gross - BHXH - BHYT - BHTN;
    const taxable = Taxable(income, minReduce, Dependent, perDependent);   

    let tax =0;
    
    if (taxable!=0)
    {
        tax = Tax(taxable, taxLevel, taxsMax, taxsPercent);
    }

    const net = income - tax;

    const returnValue = {
        net : net,
        socialInsurance: BHXH,
        healthInsurance: BHYT,
        unemploymentInsurance: BHTN,
        tax: tax
    }  
    return returnValue;
}

module.exports = {TaxLevel, Insurance, Taxable, Tax, GrossToNetCalculate}