const grossToNetCalculate = require('../calculator/grosstonet.calculator');

describe('Calculate Insurance', ()=>{
    test('Gross * Percent smaller than Max then return Gross * Percent', () => {
        const gross = 1000;
        const max = 200;
        const percent = 0.1;
        expect(grossToNetCalculate.Insurance(gross, max, percent)).toBe(gross*percent);
    });
    test('Gross * Percent larger than Max then return Max', () => {
        const gross = 3000;
        const max = 200;
        const percent = 0.1;
        expect(grossToNetCalculate.Insurance(gross, max, percent)).toBe(max);
    });
    test('Gross * Percent equal to Max then return Max', () => {
        const gross = 2000;
        const max = 200;
        const percent = 0.1;
        expect(grossToNetCalculate.Insurance(gross, max, percent)).toBe(max);
    });
})

describe('Calculate Tax Level', ()=>{
    
    const levels = [0, 1000, 5000, 10000];

    test('Taxable equal level[0] then return 0', () => {
        const taxable = 0;
        expect(grossToNetCalculate.TaxLevel(taxable, levels)).toBe(0);
    });
    test('Taxable equal level[i] then return i', () => {
        const i=2;
        const taxable = levels[i];
        expect(grossToNetCalculate.TaxLevel(taxable, levels)).toBe(i);
    });
    test('Taxable smaller than level[0] then return 0', () => {
        const taxable = -1000;
        expect(grossToNetCalculate.TaxLevel(taxable, levels)).toBe(0);
    });
    test('Taxable larger than level[i] but smaller than level[i+1] then return i+1', () => {
        const i = 2
        const taxable = levels[i] + 1;
        expect(grossToNetCalculate.TaxLevel(taxable, levels)).toBe(i+1);
    });
    test('Taxable larger than level[max] then return max+1', () => {
        const i = levels.length;
        const taxable = levels[i-1] + 1;
        expect(grossToNetCalculate.TaxLevel(taxable, levels)).toBe(i);
    });
})

describe('Calculate Taxable', ()=>{
    
    const reduce = 1000;
    const perDependent = 100;

    test('Income is smaller than 0 return 0', () => {
        const income = -1;
        const dependent = 1;
        expect(grossToNetCalculate.Taxable(income, reduce, dependent, perDependent)).toBe(0);
    });
    test('Income is equal 0 return 0', () => {
        const income = 0;
        const dependent = 1;
        expect(grossToNetCalculate.Taxable(income, reduce, dependent, perDependent)).toBe(0);
    });
    test('Income is smaller than (reduce + dependent*perDependent) return 0', () => {
        const dependent = 1;
        const income = (reduce + dependent*perDependent) -1;
        expect(grossToNetCalculate.Taxable(income, reduce, dependent, perDependent)).toBe(0);
    });
    test('Income is larger than (reduce + dependent*perDependent) return (income-(reduce + dependent*perDependent))', () => {
        const dependent = 1;
        const income = (reduce + dependent*perDependent) +1;
        expect(grossToNetCalculate.Taxable(income, reduce, dependent, perDependent)).toBe(income-(reduce + dependent*perDependent));
    });
})

describe('Calculate Tax', ()=>{
    
    const taxsMax = [25000, 50000, 75000, 100000];
    const taxsPercent = [0.05, 0.1, 0.15, 0.2, 0.25];
    const taxLevel = [0,500000,1000000,2000000,3000000]
    
    test('taxable is largler than taxLevel[i] and smaller than taxLevel[i+1]', ()=>{

        let tax = 0;
        const i=2;
        const largerAmmount = 20000
        const taxable=taxLevel[i]+largerAmmount;

        for (let y=0; y<i; y++ ){
            tax += taxsMax[y];
        }
        tax += largerAmmount*taxsPercent[i]

        expect(grossToNetCalculate.Tax(taxable, taxLevel, taxsMax, taxsPercent)).toBe(tax);
    });
    test('taxable is largler than taxLevel[max]', ()=>{

        let tax = 0;
        const level = taxLevel.length;
        const i = level-1;
        const largerAmmount = 20000
        const taxable=taxLevel[i]+largerAmmount;

        for (let y=0; y<i; y++ ){
            tax += taxsMax[y];
        }
        tax += largerAmmount*taxsPercent[i]

        expect(grossToNetCalculate.Tax(taxable, taxLevel, taxsMax, taxsPercent)).toBe(tax);
    });
})


describe('Gross To Net', ()=>{
    
    const taxsMax = [25000, 50000, 75000, 100000];
    const taxsPercent = [0.05, 0.1, 0.15, 0.2, 0.25];
    const taxLevel = [0,500000,1000000,2000000,3000000]
    
    test('Gross equal 0, return 0', ()=>{
        const gross = 0;
        const dependent = 0;
        const area = 1;
        expect(grossToNetCalculate.GrossToNetCalculate(gross, area, dependent).net).toBe(0);
    });
})

