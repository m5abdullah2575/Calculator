// Multi-Tool Calculator & Converter JavaScript Functions

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const toolCards = document.querySelectorAll('.tool-card');

    if (searchInput && toolCards.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            toolCards.forEach(card => {
                const toolName = card.dataset.tool ? card.dataset.tool.toLowerCase() : '';
                const cardText = card.textContent.toLowerCase();
                
                if (toolName.includes(searchTerm) || cardText.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Category filter functionality
function initializeCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-filter');
    const toolCards = document.querySelectorAll('.tool-card');
    const sections = document.querySelectorAll('section[id]');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter content based on category
            if (category === 'all') {
                // Show all sections and cards
                sections.forEach(section => section.style.display = 'block');
                toolCards.forEach(card => card.style.display = 'block');
            } else {
                // Hide all sections first
                sections.forEach(section => section.style.display = 'none');
                
                // Show only the relevant section
                let targetSection = document.getElementById(category);
                
                // Handle specific category mappings
                if (!targetSection) {
                    if (category === 'basic') {
                        targetSection = document.getElementById('basic');
                    } else if (category === 'business') {
                        targetSection = document.getElementById('business');
                    } else if (category === 'financial') {
                        targetSection = document.getElementById('financial');
                    } else if (category === 'health') {
                        targetSection = document.getElementById('health');
                    } else if (category === 'engineering') {
                        targetSection = document.getElementById('engineering');
                    } else if (category === 'converters') {
                        targetSection = document.getElementById('converters');
                    } else if (category === 'utilities') {
                        targetSection = document.getElementById('utilities');
                    }
                }
                
                if (targetSection) {
                    targetSection.style.display = 'block';
                }
            }
        });
    });
}

// Utility functions
function showResult(elementId, content, isError = false) {
    const element = document.getElementById(elementId);
    element.innerHTML = content;
    element.className = `result-display ${isError ? 'error' : 'success'}`;
    element.classList.remove('hidden');
}

function hideResult(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('hidden');
}

function validateInput(value, fieldName) {
    if (value === '' || value === null || value === undefined) {
        throw new Error(`${fieldName} is required`);
    }
    if (isNaN(value)) {
        throw new Error(`${fieldName} must be a valid number`);
    }
    return parseFloat(value);
}

// Age Calculator
function calculateAge() {
    try {
        const dob = document.getElementById('ageDob').value;
        if (!dob) throw new Error('Date of birth is required');
        
        const birthDate = new Date(dob);
        const today = new Date();
        
        if (birthDate > today) throw new Error('Birth date cannot be in the future');
        
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        
        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;
        const totalSeconds = totalMinutes * 60;
        
        const result = `
            <strong>Age:</strong> ${years} years, ${months} months, ${days} days<br>
            <strong>Total:</strong> ${totalDays.toLocaleString()} days<br>
            <strong>Hours:</strong> ${totalHours.toLocaleString()}<br>
            <strong>Minutes:</strong> ${totalMinutes.toLocaleString()}<br>
            <strong>Seconds:</strong> ${totalSeconds.toLocaleString()}
        `;
        
        showResult('ageResult', result);
    } catch (error) {
        showResult('ageResult', error.message, true);
    }
}

function resetAge() {
    document.getElementById('ageDob').value = '';
    hideResult('ageResult');
}

// BMI Calculator
function calculateBMI() {
    try {
        const weight = validateInput(document.getElementById('bmiWeight').value, 'Weight');
        const height = validateInput(document.getElementById('bmiHeight').value, 'Height');
        
        if (weight <= 0 || height <= 0) throw new Error('Weight and height must be positive numbers');
        
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        
        let category;
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal weight';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';
        
        const result = `
            <strong>BMI:</strong> ${bmi.toFixed(1)}<br>
            <strong>Category:</strong> ${category}
        `;
        
        showResult('bmiResult', result);
    } catch (error) {
        showResult('bmiResult', error.message, true);
    }
}

function resetBMI() {
    document.getElementById('bmiWeight').value = '';
    document.getElementById('bmiHeight').value = '';
    hideResult('bmiResult');
}

// BMR Calculator
function calculateBMR() {
    try {
        const weight = validateInput(document.getElementById('bmrWeight').value, 'Weight');
        const height = validateInput(document.getElementById('bmrHeight').value, 'Height');
        const age = validateInput(document.getElementById('bmrAge').value, 'Age');
        const gender = document.getElementById('bmrGender').value;
        
        if (weight <= 0 || height <= 0 || age <= 0) {
            throw new Error('Weight, height, and age must be positive numbers');
        }
        
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        
        const activityLevels = {
            sedentary: bmr * 1.2,
            light: bmr * 1.375,
            moderate: bmr * 1.55,
            active: bmr * 1.725,
            very_active: bmr * 1.9
        };
        
        const result = `
            <strong>BMR:</strong> ${Math.round(bmr)} calories/day<br>
            <strong>Sedentary:</strong> ${Math.round(activityLevels.sedentary)} cal/day<br>
            <strong>Light Activity:</strong> ${Math.round(activityLevels.light)} cal/day<br>
            <strong>Moderate Activity:</strong> ${Math.round(activityLevels.moderate)} cal/day<br>
            <strong>Active:</strong> ${Math.round(activityLevels.active)} cal/day<br>
            <strong>Very Active:</strong> ${Math.round(activityLevels.very_active)} cal/day
        `;
        
        showResult('bmrResult', result);
    } catch (error) {
        showResult('bmrResult', error.message, true);
    }
}

function resetBMR() {
    document.getElementById('bmrWeight').value = '';
    document.getElementById('bmrHeight').value = '';
    document.getElementById('bmrAge').value = '';
    document.getElementById('bmrGender').value = 'male';
    hideResult('bmrResult');
}

// Percentage Calculator
function calculatePercentage() {
    try {
        const number = validateInput(document.getElementById('percentNumber').value, 'Number');
        const percentage = validateInput(document.getElementById('percentValue').value, 'Percentage');
        
        const result = (number * percentage) / 100;
        const percentageOf = (number / percentage) * 100;
        const changePercent = ((percentage - number) / number) * 100;
        
        const resultText = `
            <strong>${percentage}% of ${number}:</strong> ${result.toFixed(2)}<br>
            <strong>${number} is what % of ${percentage}:</strong> ${percentageOf.toFixed(2)}%<br>
            <strong>Percentage change:</strong> ${changePercent.toFixed(2)}%
        `;
        
        showResult('percentResult', resultText);
    } catch (error) {
        showResult('percentResult', error.message, true);
    }
}

function resetPercentage() {
    document.getElementById('percentNumber').value = '';
    document.getElementById('percentValue').value = '';
    hideResult('percentResult');
}

// Compound Interest Calculator
function calculateCompoundInterest() {
    try {
        const principal = validateInput(document.getElementById('ciPrincipal').value, 'Principal');
        const rate = validateInput(document.getElementById('ciRate').value, 'Interest rate');
        const time = validateInput(document.getElementById('ciTime').value, 'Time period');
        
        if (principal <= 0 || rate <= 0 || time <= 0) {
            throw new Error('All values must be positive numbers');
        }
        
        const amount = principal * Math.pow((1 + rate / 100), time);
        const interest = amount - principal;
        
        const result = `
            <strong>Principal:</strong> $${principal.toLocaleString()}<br>
            <strong>Interest Earned:</strong> $${interest.toLocaleString()}<br>
            <strong>Total Amount:</strong> $${amount.toLocaleString()}
        `;
        
        showResult('ciResult', result);
    } catch (error) {
        showResult('ciResult', error.message, true);
    }
}

function resetCompoundInterest() {
    document.getElementById('ciPrincipal').value = '';
    document.getElementById('ciRate').value = '';
    document.getElementById('ciTime').value = '';
    hideResult('ciResult');
}

// EMI Calculator
function calculateEMI() {
    try {
        const principal = validateInput(document.getElementById('loanAmount').value, 'Loan amount');
        const annualRate = validateInput(document.getElementById('loanRate').value, 'Interest rate');
        const years = validateInput(document.getElementById('loanTenure').value, 'Loan tenure');
        
        if (principal <= 0 || annualRate <= 0 || years <= 0) {
            throw new Error('All values must be positive numbers');
        }
        
        const monthlyRate = annualRate / (12 * 100);
        const months = years * 12;
        
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
        
        const totalAmount = emi * months;
        const totalInterest = totalAmount - principal;
        
        const result = `
            <strong>Monthly EMI:</strong> $${emi.toFixed(2)}<br>
            <strong>Total Interest:</strong> $${totalInterest.toLocaleString()}<br>
            <strong>Total Amount:</strong> $${totalAmount.toLocaleString()}
        `;
        
        showResult('emiResult', result);
    } catch (error) {
        showResult('emiResult', error.message, true);
    }
}

function resetEMI() {
    document.getElementById('loanAmount').value = '';
    document.getElementById('loanRate').value = '';
    document.getElementById('loanTenure').value = '';
    hideResult('emiResult');
}

// Length Converter
function convertLength() {
    try {
        const value = validateInput(document.getElementById('lengthValue').value, 'Length value');
        const fromUnit = document.getElementById('lengthFrom').value;
        const toUnit = document.getElementById('lengthTo').value;
        
        if (value < 0) throw new Error('Length cannot be negative');
        
        // Convert to meters first
        const toMeters = {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            feet: 0.3048,
            inch: 0.0254,
            mile: 1609.34
        };
        
        const fromMeters = {
            meter: 1,
            kilometer: 0.001,
            centimeter: 100,
            feet: 3.28084,
            inch: 39.3701,
            mile: 0.000621371
        };
        
        const meters = value * toMeters[fromUnit];
        const result = meters * fromMeters[toUnit];
        
        showResult('lengthResult', `<strong>Result:</strong> ${result.toFixed(6)} ${toUnit}`);
    } catch (error) {
        showResult('lengthResult', error.message, true);
    }
}

function resetLength() {
    document.getElementById('lengthValue').value = '';
    document.getElementById('lengthFrom').value = 'meter';
    document.getElementById('lengthTo').value = 'meter';
    hideResult('lengthResult');
}

// Temperature Converter
function convertTemperature() {
    try {
        const value = validateInput(document.getElementById('tempValue').value, 'Temperature');
        const fromUnit = document.getElementById('tempFrom').value;
        const toUnit = document.getElementById('tempTo').value;
        
        let result;
        
        // Convert to Celsius first
        let celsius;
        switch (fromUnit) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
        }
        
        // Convert from Celsius to target unit
        switch (toUnit) {
            case 'celsius':
                result = celsius;
                break;
            case 'fahrenheit':
                result = (celsius * 9/5) + 32;
                break;
            case 'kelvin':
                result = celsius + 273.15;
                break;
        }
        
        const unit = toUnit.charAt(0).toUpperCase() + toUnit.slice(1);
        showResult('tempResult', `<strong>Result:</strong> ${result.toFixed(2)}° ${unit}`);
    } catch (error) {
        showResult('tempResult', error.message, true);
    }
}

function resetTemperature() {
    document.getElementById('tempValue').value = '';
    document.getElementById('tempFrom').value = 'celsius';
    document.getElementById('tempTo').value = 'celsius';
    hideResult('tempResult');
}

// Weight Converter
function convertWeight() {
    try {
        const value = validateInput(document.getElementById('weightValue').value, 'Weight');
        const fromUnit = document.getElementById('weightFrom').value;
        const toUnit = document.getElementById('weightTo').value;
        
        if (value < 0) throw new Error('Weight cannot be negative');
        
        // Convert to grams first
        const toGrams = {
            kilogram: 1000,
            gram: 1,
            pound: 453.592,
            ounce: 28.3495
        };
        
        const fromGrams = {
            kilogram: 0.001,
            gram: 1,
            pound: 0.00220462,
            ounce: 0.035274
        };
        
        const grams = value * toGrams[fromUnit];
        const result = grams * fromGrams[toUnit];
        
        showResult('weightResult', `<strong>Result:</strong> ${result.toFixed(6)} ${toUnit}`);
    } catch (error) {
        showResult('weightResult', error.message, true);
    }
}

function resetWeight() {
    document.getElementById('weightValue').value = '';
    document.getElementById('weightFrom').value = 'kilogram';
    document.getElementById('weightTo').value = 'kilogram';
    hideResult('weightResult');
}

// Word Counter
function countWords() {
    try {
        const text = document.getElementById('wordCountText').value;
        
        if (!text.trim()) {
            showResult('wordCountResult', '<strong>Words:</strong> 0<br><strong>Characters:</strong> 0<br><strong>Characters (no spaces):</strong> 0');
            return;
        }
        
        const words = text.trim().split(/\s+/).length;
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
        
        const result = `
            <strong>Words:</strong> ${words}<br>
            <strong>Characters:</strong> ${characters}<br>
            <strong>Characters (no spaces):</strong> ${charactersNoSpaces}<br>
            <strong>Sentences:</strong> ${sentences}<br>
            <strong>Paragraphs:</strong> ${paragraphs}
        `;
        
        showResult('wordCountResult', result);
    } catch (error) {
        showResult('wordCountResult', error.message, true);
    }
}

function resetWordCount() {
    document.getElementById('wordCountText').value = '';
    hideResult('wordCountResult');
}

// Password Generator
function generatePassword() {
    try {
        const length = validateInput(document.getElementById('passwordLength').value, 'Password length');
        const includeUppercase = document.getElementById('includeUppercase').checked;
        const includeLowercase = document.getElementById('includeLowercase').checked;
        const includeNumbers = document.getElementById('includeNumbers').checked;
        const includeSymbols = document.getElementById('includeSymbols').checked;
        
        if (length < 4 || length > 50) {
            throw new Error('Password length must be between 4 and 50 characters');
        }
        
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            throw new Error('Please select at least one character type');
        }
        
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        const result = `
            <strong>Generated Password:</strong><br>
            <div style="background: #f9fafb; padding: 8px; border-radius: 4px; font-family: monospace; word-break: break-all; margin-top: 8px;">
                ${password}
            </div>
            <button onclick="copyToClipboard('${password}')" class="copy-btn mt-2">Copy</button>
        `;
        
        showResult('passwordResult', result);
    } catch (error) {
        showResult('passwordResult', error.message, true);
    }
}

function resetPassword() {
    document.getElementById('passwordLength').value = '12';
    document.getElementById('includeUppercase').checked = true;
    document.getElementById('includeLowercase').checked = true;
    document.getElementById('includeNumbers').checked = true;
    document.getElementById('includeSymbols').checked = false;
    hideResult('passwordResult');
}

// QR Code Generator
function generateQR() {
    try {
        const text = document.getElementById('qrText').value.trim();
        
        if (!text) {
            throw new Error('Please enter text or URL to generate QR code');
        }
        
        const canvas = document.createElement('canvas');
        QRCode.toCanvas(canvas, text, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, function(error) {
            if (error) {
                showResult('qrResult', 'Error generating QR code', true);
            } else {
                const result = `
                    <strong>QR Code Generated:</strong><br>
                    <div style="margin-top: 8px;">
                        ${canvas.outerHTML}
                    </div>
                `;
                showResult('qrResult', result);
            }
        });
    } catch (error) {
        showResult('qrResult', error.message, true);
    }
}

function resetQR() {
    document.getElementById('qrText').value = '';
    hideResult('qrResult');
}

// Text Case Converter
function convertCase(caseType) {
    try {
        const text = document.getElementById('caseText').value;
        
        if (!text.trim()) {
            throw new Error('Please enter text to convert');
        }
        
        let result;
        switch (caseType) {
            case 'uppercase':
                result = text.toUpperCase();
                break;
            case 'lowercase':
                result = text.toLowerCase();
                break;
            case 'title':
                result = text.replace(/\w\S*/g, (txt) => 
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                break;
        }
        
        const resultHtml = `
            <strong>${caseType.charAt(0).toUpperCase() + caseType.slice(1)}:</strong><br>
            <div style="background: #f9fafb; padding: 8px; border-radius: 4px; margin-top: 8px; white-space: pre-wrap;">
                ${result}
            </div>
            <button onclick="copyToClipboard('${result.replace(/'/g, "\\'")}\')" class="copy-btn mt-2">Copy</button>
        `;
        
        showResult('caseResult', resultHtml);
    } catch (error) {
        showResult('caseResult', error.message, true);
    }
}

function resetCase() {
    document.getElementById('caseText').value = '';
    hideResult('caseResult');
}

// Currency Converter (using fixed rates for demo)
function convertCurrency() {
    try {
        const amount = validateInput(document.getElementById('currencyAmount').value, 'Amount');
        const fromCurrency = document.getElementById('currencyFrom').value;
        const toCurrency = document.getElementById('currencyTo').value;
        
        if (amount < 0) throw new Error('Amount cannot be negative');
        
        // Fixed exchange rates (in a real app, you would fetch from an API)
        const exchangeRates = {
            'USD': { 'EUR': 0.85, 'GBP': 0.73, 'JPY': 110, 'INR': 74, 'PKR': 280 },
            'EUR': { 'USD': 1.18, 'GBP': 0.86, 'JPY': 129, 'INR': 87, 'PKR': 330 },
            'GBP': { 'USD': 1.37, 'EUR': 1.16, 'JPY': 150, 'INR': 101, 'PKR': 384 },
            'JPY': { 'USD': 0.0091, 'EUR': 0.0077, 'GBP': 0.0067, 'INR': 0.67, 'PKR': 2.55 },
            'INR': { 'USD': 0.014, 'EUR': 0.011, 'GBP': 0.0099, 'JPY': 1.49, 'PKR': 3.78 },
            'PKR': { 'USD': 0.0036, 'EUR': 0.003, 'GBP': 0.0026, 'JPY': 0.39, 'INR': 0.26 }
        };
        
        let result;
        if (fromCurrency === toCurrency) {
            result = amount;
        } else {
            const rate = exchangeRates[fromCurrency][toCurrency];
            result = amount * rate;
        }
        
        const resultText = `
            <strong>Converted Amount:</strong><br>
            ${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}<br>
            <small style="color: #666;">*Rates are approximate and for demonstration only</small>
        `;
        
        showResult('currencyResult', resultText);
    } catch (error) {
        showResult('currencyResult', error.message, true);
    }
}

function resetCurrency() {
    document.getElementById('currencyAmount').value = '';
    document.getElementById('currencyFrom').value = 'USD';
    document.getElementById('currencyTo').value = 'USD';
    hideResult('currencyResult');
}

// Tip Calculator
function calculateTip() {
    try {
        const billAmount = validateInput(document.getElementById('billAmount').value, 'Bill amount');
        const tipPercentage = validateInput(document.getElementById('tipPercentage').value, 'Tip percentage');
        const numberOfPeople = validateInput(document.getElementById('numberOfPeople').value, 'Number of people');
        
        if (billAmount <= 0 || tipPercentage < 0 || numberOfPeople <= 0) {
            throw new Error('Please enter valid positive values');
        }
        
        const tipAmount = (billAmount * tipPercentage) / 100;
        const totalAmount = billAmount + tipAmount;
        const amountPerPerson = totalAmount / numberOfPeople;
        const tipPerPerson = tipAmount / numberOfPeople;
        
        const result = `
            <strong>Tip Amount:</strong> $${tipAmount.toFixed(2)}<br>
            <strong>Total Amount:</strong> $${totalAmount.toFixed(2)}<br>
            <strong>Amount per Person:</strong> $${amountPerPerson.toFixed(2)}<br>
            <strong>Tip per Person:</strong> $${tipPerPerson.toFixed(2)}
        `;
        
        showResult('tipResult', result);
    } catch (error) {
        showResult('tipResult', error.message, true);
    }
}

function resetTip() {
    document.getElementById('billAmount').value = '';
    document.getElementById('tipPercentage').value = '15';
    document.getElementById('numberOfPeople').value = '1';
    hideResult('tipResult');
}

// Utility function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show temporary success message
        const originalText = event.target.textContent;
        event.target.textContent = 'Copied!';
        event.target.style.background = '#10b981';
        event.target.style.color = 'white';
        
        setTimeout(() => {
            event.target.textContent = originalText;
            event.target.style.background = '#f3f4f6';
            event.target.style.color = '#374151';
        }, 2000);
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeCategoryFilters();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        
        // Esc to clear search
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput.value) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    });
    
    // Add real-time input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0 && this.min === '0') {
                this.value = 0;
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Service Worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('SW registered: ', registration);
        }).catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

// Add performance monitoring
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.duration}ms`);
    }
});
observer.observe({entryTypes: ['measure', 'navigation']});

// Error handling for global errors
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You could send this to an error reporting service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error reporting service
});

// NEW CALCULATOR FUNCTIONS

// Salary Calculator
function calculateSalary() {
    try {
        const amount = validateInput(document.getElementById('salaryAmount').value, 'Salary amount');
        const period = document.getElementById('payPeriod').value;
        const hoursPerWeek = validateInput(document.getElementById('hoursPerWeek').value, 'Hours per week');
        const weeksPerYear = validateInput(document.getElementById('weeksPerYear').value, 'Weeks per year');
        
        if (amount <= 0 || hoursPerWeek <= 0 || weeksPerYear <= 0) {
            throw new Error('All values must be positive numbers');
        }
        
        // Convert everything to annual salary first
        let annualSalary;
        switch (period) {
            case 'hourly':
                annualSalary = amount * hoursPerWeek * weeksPerYear;
                break;
            case 'daily':
                annualSalary = amount * (hoursPerWeek / 5) * weeksPerYear;
                break;
            case 'weekly':
                annualSalary = amount * weeksPerYear;
                break;
            case 'monthly':
                annualSalary = amount * 12;
                break;
            case 'annual':
                annualSalary = amount;
                break;
        }
        
        // Calculate all periods
        const hourly = annualSalary / (hoursPerWeek * weeksPerYear);
        const daily = hourly * (hoursPerWeek / 5);
        const weekly = annualSalary / weeksPerYear;
        const monthly = annualSalary / 12;
        
        const result = `
            <strong>Salary Breakdown:</strong><br>
            <strong>Hourly:</strong> $${hourly.toFixed(2)}<br>
            <strong>Daily:</strong> $${daily.toFixed(2)}<br>
            <strong>Weekly:</strong> $${weekly.toFixed(2)}<br>
            <strong>Monthly:</strong> $${monthly.toLocaleString(undefined, {minimumFractionDigits: 2})}<br>
            <strong>Annual:</strong> $${annualSalary.toLocaleString(undefined, {minimumFractionDigits: 2})}
        `;
        
        showResult('salaryResult', result);
    } catch (error) {
        showResult('salaryResult', error.message, true);
    }
}

function resetSalary() {
    document.getElementById('salaryAmount').value = '';
    document.getElementById('payPeriod').value = 'hourly';
    document.getElementById('hoursPerWeek').value = '40';
    document.getElementById('weeksPerYear').value = '52';
    hideResult('salaryResult');
}

// ROI Calculator
function calculateROI() {
    try {
        const initial = validateInput(document.getElementById('initialInvestment').value, 'Initial investment');
        const final = validateInput(document.getElementById('finalValue').value, 'Final value');
        const time = validateInput(document.getElementById('timePeriod').value, 'Time period');
        
        if (initial <= 0 || final <= 0 || time <= 0) {
            throw new Error('All values must be positive numbers');
        }
        
        const profit = final - initial;
        const roi = (profit / initial) * 100;
        const annualizedROI = Math.pow((final / initial), (1 / time)) - 1;
        
        let roiClass = roi >= 0 ? 'success' : 'error';
        
        const result = `
            <strong>Investment Analysis:</strong><br>
            <strong>Total Profit/Loss:</strong> $${profit.toLocaleString(undefined, {minimumFractionDigits: 2})}<br>
            <strong>ROI:</strong> ${roi.toFixed(2)}%<br>
            <strong>Annualized ROI:</strong> ${(annualizedROI * 100).toFixed(2)}%<br>
            <strong>Investment Period:</strong> ${time} year(s)
        `;
        
        showResult('roiResult', result, roi < 0);
    } catch (error) {
        showResult('roiResult', error.message, true);
    }
}

function resetROI() {
    document.getElementById('initialInvestment').value = '';
    document.getElementById('finalValue').value = '';
    document.getElementById('timePeriod').value = '';
    hideResult('roiResult');
}

// Break-Even Calculator
function calculateBreakEven() {
    try {
        const fixedCosts = validateInput(document.getElementById('fixedCosts').value, 'Fixed costs');
        const variableCost = validateInput(document.getElementById('variableCost').value, 'Variable cost per unit');
        const sellingPrice = validateInput(document.getElementById('sellingPrice').value, 'Selling price per unit');
        
        if (fixedCosts <= 0 || variableCost < 0 || sellingPrice <= 0) {
            throw new Error('Fixed costs and selling price must be positive; variable cost cannot be negative');
        }
        
        if (sellingPrice <= variableCost) {
            throw new Error('Selling price must be greater than variable cost per unit');
        }
        
        const contributionMargin = sellingPrice - variableCost;
        const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
        const breakEvenRevenue = breakEvenUnits * sellingPrice;
        const marginPercent = (contributionMargin / sellingPrice) * 100;
        
        const result = `
            <strong>Break-Even Analysis:</strong><br>
            <strong>Break-Even Units:</strong> ${breakEvenUnits.toLocaleString()}<br>
            <strong>Break-Even Revenue:</strong> $${breakEvenRevenue.toLocaleString()}<br>
            <strong>Contribution Margin:</strong> $${contributionMargin.toFixed(2)} (${marginPercent.toFixed(1)}%)<br>
            <strong>Units for $10k profit:</strong> ${Math.ceil((fixedCosts + 10000) / contributionMargin).toLocaleString()}
        `;
        
        showResult('breakEvenResult', result);
    } catch (error) {
        showResult('breakEvenResult', error.message, true);
    }
}

function resetBreakEven() {
    document.getElementById('fixedCosts').value = '';
    document.getElementById('variableCost').value = '';
    document.getElementById('sellingPrice').value = '';
    hideResult('breakEvenResult');
}

// Blood Pressure Calculator
function calculateBloodPressure() {
    try {
        const systolic = validateInput(document.getElementById('systolic').value, 'Systolic pressure');
        const diastolic = validateInput(document.getElementById('diastolic').value, 'Diastolic pressure');
        
        if (systolic <= 0 || diastolic <= 0 || systolic > 300 || diastolic > 200) {
            throw new Error('Please enter valid blood pressure readings');
        }
        
        if (systolic < diastolic) {
            throw new Error('Systolic pressure should be higher than diastolic pressure');
        }
        
        let category, color, advice;
        
        if (systolic < 120 && diastolic < 80) {
            category = 'Normal';
            color = 'success';
            advice = 'Maintain healthy lifestyle';
        } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
            category = 'Elevated';
            color = 'error';
            advice = 'Lifestyle changes recommended';
        } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
            category = 'Stage 1 High Blood Pressure';
            color = 'error';
            advice = 'Consult healthcare provider';
        } else if (systolic >= 140 || diastolic >= 90) {
            category = 'Stage 2 High Blood Pressure';
            color = 'error';
            advice = 'Seek immediate medical attention';
        } else {
            category = 'Hypertensive Crisis';
            color = 'error';
            advice = 'Emergency medical attention required';
        }
        
        const result = `
            <strong>Blood Pressure Reading:</strong><br>
            <strong>${systolic}/${diastolic} mmHg</strong><br>
            <strong>Category:</strong> ${category}<br>
            <strong>Recommendation:</strong> ${advice}<br>
            <em>Consult healthcare professionals for medical advice</em>
        `;
        
        showResult('bloodPressureResult', result, color === 'error');
    } catch (error) {
        showResult('bloodPressureResult', error.message, true);
    }
}

function resetBloodPressure() {
    document.getElementById('systolic').value = '';
    document.getElementById('diastolic').value = '';
    hideResult('bloodPressureResult');
}

// Area Calculator
function updateShapeInputs() {
    const shapeType = document.getElementById('shapeType').value;
    const inputsContainer = document.getElementById('shapeInputs');
    
    let inputsHTML = '';
    
    switch (shapeType) {
        case 'rectangle':
            inputsHTML = `
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Length</label>
                    <input type="number" id="length" placeholder="Enter length" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Width</label>
                    <input type="number" id="width" placeholder="Enter width" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
            `;
            break;
        case 'circle':
            inputsHTML = `
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Radius</label>
                    <input type="number" id="radius" placeholder="Enter radius" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
            `;
            break;
        case 'triangle':
            inputsHTML = `
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Base</label>
                    <input type="number" id="base" placeholder="Enter base" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Height</label>
                    <input type="number" id="height" placeholder="Enter height" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
            `;
            break;
        case 'square':
            inputsHTML = `
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Side Length</label>
                    <input type="number" id="side" placeholder="Enter side length" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
            `;
            break;
        case 'parallelogram':
            inputsHTML = `
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Base</label>
                    <input type="number" id="base" placeholder="Enter base" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Height</label>
                    <input type="number" id="height" placeholder="Enter height" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
            `;
            break;
        case 'trapezoid':
            inputsHTML = `
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Base 1</label>
                    <input type="number" id="base1" placeholder="Enter first base" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Base 2</label>
                    <input type="number" id="base2" placeholder="Enter second base" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-3">Height</label>
                    <input type="number" id="height" placeholder="Enter height" class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
            `;
            break;
    }
    
    inputsContainer.innerHTML = inputsHTML;
}

function calculateArea() {
    try {
        const shapeType = document.getElementById('shapeType').value;
        let area, perimeter;
        
        switch (shapeType) {
            case 'rectangle':
                const length = validateInput(document.getElementById('length').value, 'Length');
                const width = validateInput(document.getElementById('width').value, 'Width');
                if (length <= 0 || width <= 0) throw new Error('Length and width must be positive');
                area = length * width;
                perimeter = 2 * (length + width);
                break;
                
            case 'circle':
                const radius = validateInput(document.getElementById('radius').value, 'Radius');
                if (radius <= 0) throw new Error('Radius must be positive');
                area = Math.PI * radius * radius;
                perimeter = 2 * Math.PI * radius;
                break;
                
            case 'triangle':
                const base = validateInput(document.getElementById('base').value, 'Base');
                const height = validateInput(document.getElementById('height').value, 'Height');
                if (base <= 0 || height <= 0) throw new Error('Base and height must be positive');
                area = 0.5 * base * height;
                perimeter = 'Perimeter requires all three sides';
                break;
                
            case 'square':
                const side = validateInput(document.getElementById('side').value, 'Side length');
                if (side <= 0) throw new Error('Side length must be positive');
                area = side * side;
                perimeter = 4 * side;
                break;
                
            case 'parallelogram':
                const pBase = validateInput(document.getElementById('base').value, 'Base');
                const pHeight = validateInput(document.getElementById('height').value, 'Height');
                if (pBase <= 0 || pHeight <= 0) throw new Error('Base and height must be positive');
                area = pBase * pHeight;
                perimeter = 'Perimeter requires both side lengths';
                break;
                
            case 'trapezoid':
                const base1 = validateInput(document.getElementById('base1').value, 'Base 1');
                const base2 = validateInput(document.getElementById('base2').value, 'Base 2');
                const tHeight = validateInput(document.getElementById('height').value, 'Height');
                if (base1 <= 0 || base2 <= 0 || tHeight <= 0) throw new Error('All measurements must be positive');
                area = 0.5 * (base1 + base2) * tHeight;
                perimeter = 'Perimeter requires all four sides';
                break;
        }
        
        const result = `
            <strong>${shapeType.charAt(0).toUpperCase() + shapeType.slice(1)} Calculation:</strong><br>
            <strong>Area:</strong> ${area.toFixed(4)} square units<br>
            <strong>Perimeter/Circumference:</strong> ${typeof perimeter === 'number' ? perimeter.toFixed(4) + ' units' : perimeter}
        `;
        
        showResult('areaResult', result);
    } catch (error) {
        showResult('areaResult', error.message, true);
    }
}

function resetArea() {
    const inputs = document.querySelectorAll('#shapeInputs input');
    inputs.forEach(input => input.value = '');
    hideResult('areaResult');
}

// Ovulation Calculator
function calculateOvulation() {
    try {
        const lastPeriodDate = document.getElementById('lastPeriod').value;
        const cycleLength = validateInput(document.getElementById('cycleLength').value, 'Cycle length');
        const lutealPhase = validateInput(document.getElementById('lutealPhase').value, 'Luteal phase');
        
        if (!lastPeriodDate) throw new Error('Last period date is required');
        
        if (cycleLength < 21 || cycleLength > 45) {
            throw new Error('Cycle length should be between 21-45 days');
        }
        
        if (lutealPhase < 10 || lutealPhase > 16) {
            throw new Error('Luteal phase should be between 10-16 days');
        }
        
        const lastPeriod = new Date(lastPeriodDate);
        const today = new Date();
        
        if (lastPeriod > today) {
            throw new Error('Last period date cannot be in the future');
        }
        
        // Calculate ovulation date
        const ovulationDay = cycleLength - lutealPhase;
        const ovulationDate = new Date(lastPeriod);
        ovulationDate.setDate(lastPeriod.getDate() + ovulationDay);
        
        // Calculate fertile window (5 days before ovulation + ovulation day)
        const fertileStart = new Date(ovulationDate);
        fertileStart.setDate(ovulationDate.getDate() - 5);
        
        const fertileEnd = new Date(ovulationDate);
        fertileEnd.setDate(ovulationDate.getDate() + 1);
        
        // Calculate next period
        const nextPeriod = new Date(lastPeriod);
        nextPeriod.setDate(lastPeriod.getDate() + cycleLength);
        
        const formatDate = (date) => date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const result = `
            <strong>Ovulation Prediction:</strong><br>
            <strong>Ovulation Date:</strong> ${formatDate(ovulationDate)}<br>
            <strong>Fertile Window:</strong> ${formatDate(fertileStart)} - ${formatDate(fertileEnd)}<br>
            <strong>Next Period:</strong> ${formatDate(nextPeriod)}<br>
            <em>These are estimates based on average cycles</em>
        `;
        
        showResult('ovulationResult', result);
    } catch (error) {
        showResult('ovulationResult', error.message, true);
    }
}

function resetOvulation() {
    document.getElementById('lastPeriod').value = '';
    document.getElementById('cycleLength').value = '28';
    document.getElementById('lutealPhase').value = '14';
    hideResult('ovulationResult');
}

// Water Intake Calculator
function calculateWaterIntake() {
    try {
        const weight = validateInput(document.getElementById('waterWeight').value, 'Weight');
        const activity = document.getElementById('waterActivity').value;
        const climate = document.getElementById('waterClimate').value;
        
        if (weight <= 0) {
            throw new Error('Weight must be a positive number');
        }
        
        // Base water intake: 35ml per kg body weight
        let baseIntake = weight * 35;
        
        // Activity multipliers
        const activityMultipliers = {
            sedentary: 1.0,
            light: 1.2,
            moderate: 1.4,
            intense: 1.6
        };
        
        // Climate multipliers
        const climateMultipliers = {
            normal: 1.0,
            hot: 1.2,
            humid: 1.3
        };
        
        const totalIntake = baseIntake * activityMultipliers[activity] * climateMultipliers[climate];
        const cups = totalIntake / 240; // 240ml per cup
        const liters = totalIntake / 1000;
        
        const result = `
            <strong>Recommended Daily Water Intake:</strong><br>
            <strong>${Math.round(totalIntake)} ml</strong><br>
            <strong>${liters.toFixed(2)} liters</strong><br>
            <strong>${Math.round(cups)} cups (8oz)</strong><br><br>
            <small>Based on your weight, activity level, and climate conditions</small>
        `;
        
        showResult('waterResult', result);
    } catch (error) {
        showResult('waterResult', error.message, true);
    }
}

function resetWaterIntake() {
    document.getElementById('waterWeight').value = '';
    document.getElementById('waterActivity').value = 'sedentary';
    document.getElementById('waterClimate').value = 'normal';
    hideResult('waterResult');
}

// Retirement Calculator
function calculateRetirement() {
    try {
        const currentAge = validateInput(document.getElementById('retireCurrentAge').value, 'Current age');
        const retireAge = validateInput(document.getElementById('retireTargetAge').value, 'Retirement age');
        const currentSavings = validateInput(document.getElementById('retireCurrentSavings').value, 'Current savings');
        const monthlyContrib = validateInput(document.getElementById('retireMonthlyContrib').value, 'Monthly contribution');
        const returnRate = validateInput(document.getElementById('retireReturn').value, 'Return rate');
        const inflationRate = validateInput(document.getElementById('retireInflation').value, 'Inflation rate');
        
        if (retireAge <= currentAge) {
            throw new Error('Retirement age must be greater than current age');
        }
        
        const yearsToRetire = retireAge - currentAge;
        const monthsToRetire = yearsToRetire * 12;
        const monthlyReturn = returnRate / 100 / 12;
        
        // Future value of current savings
        const futureCurrentSavings = currentSavings * Math.pow(1 + returnRate / 100, yearsToRetire);
        
        // Future value of monthly contributions
        let futureContributions = 0;
        if (monthlyReturn > 0) {
            futureContributions = monthlyContrib * ((Math.pow(1 + monthlyReturn, monthsToRetire) - 1) / monthlyReturn);
        }
        
        const totalRetirementSavings = futureCurrentSavings + futureContributions;
        const realValue = totalRetirementSavings / Math.pow(1 + inflationRate / 100, yearsToRetire);
        
        const result = `
            <strong>Retirement Projections:</strong><br>
            <strong>Years to retirement:</strong> ${yearsToRetire} years<br>
            <strong>Total at retirement:</strong> $${totalRetirementSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}<br>
            <strong>Real value (today's dollars):</strong> $${realValue.toLocaleString(undefined, {maximumFractionDigits: 0})}<br>
            <strong>Total contributed:</strong> $${(currentSavings + (monthlyContrib * monthsToRetire)).toLocaleString(undefined, {maximumFractionDigits: 0})}<br>
            <strong>Investment growth:</strong> $${(totalRetirementSavings - currentSavings - (monthlyContrib * monthsToRetire)).toLocaleString(undefined, {maximumFractionDigits: 0})}
        `;
        
        showResult('retireResult', result);
    } catch (error) {
        showResult('retireResult', error.message, true);
    }
}

function resetRetirement() {
    document.getElementById('retireCurrentAge').value = '';
    document.getElementById('retireTargetAge').value = '';
    document.getElementById('retireCurrentSavings').value = '';
    document.getElementById('retireMonthlyContrib').value = '';
    document.getElementById('retireReturn').value = '';
    document.getElementById('retireInflation').value = '';
    hideResult('retireResult');
}

// Carbon Footprint Calculator
function calculateCarbonFootprint() {
    try {
        const miles = validateInput(document.getElementById('carbonMiles').value || '0', 'Miles');
        const mpg = validateInput(document.getElementById('carbonMpg').value || '25', 'MPG');
        const electricity = validateInput(document.getElementById('carbonElectricity').value || '0', 'Electricity');
        const gas = validateInput(document.getElementById('carbonGas').value || '0', 'Gas');
        const flights = validateInput(document.getElementById('carbonFlights').value || '0', 'Flights');
        const diet = document.getElementById('carbonDiet').value;
        
        // Transportation emissions (lbs CO2 per gallon of gas = 19.6)
        const transportEmissions = (miles / mpg) * 19.6;
        
        // Electricity emissions (lbs CO2 per kWh = 1.22)
        const electricityEmissions = electricity * 12 * 1.22;
        
        // Natural gas emissions (lbs CO2 per therm = 11.7)
        const gasEmissions = gas * 12 * 11.7;
        
        // Flight emissions (lbs CO2 per flight = 1100 for average domestic flight)
        const flightEmissions = flights * 1100;
        
        // Diet emissions (lbs CO2 per year)
        const dietEmissions = {
            meat_heavy: 3300,
            average: 2500,
            low_meat: 1900,
            vegetarian: 1500,
            vegan: 1100
        };
        
        const totalEmissions = transportEmissions + electricityEmissions + gasEmissions + flightEmissions + dietEmissions[diet];
        const totalTons = totalEmissions / 2000;
        const usAverage = 16; // US average tons CO2 per year
        
        const result = `
            <strong>Annual Carbon Footprint:</strong><br>
            <strong>${totalTons.toFixed(1)} tons CO2</strong><br>
            <strong>${totalEmissions.toLocaleString()} lbs CO2</strong><br><br>
            <strong>Breakdown:</strong><br>
            Transportation: ${(transportEmissions/2000).toFixed(1)} tons<br>
            Electricity: ${(electricityEmissions/2000).toFixed(1)} tons<br>
            Natural Gas: ${(gasEmissions/2000).toFixed(1)} tons<br>
            Flights: ${(flightEmissions/2000).toFixed(1)} tons<br>
            Diet: ${(dietEmissions[diet]/2000).toFixed(1)} tons<br><br>
            <small>US Average: ${usAverage} tons/year | ${totalTons < usAverage ? 'Below' : 'Above'} average</small>
        `;
        
        showResult('carbonResult', result);
    } catch (error) {
        showResult('carbonResult', error.message, true);
    }
}

function resetCarbonFootprint() {
    document.getElementById('carbonMiles').value = '';
    document.getElementById('carbonMpg').value = '';
    document.getElementById('carbonElectricity').value = '';
    document.getElementById('carbonGas').value = '';
    document.getElementById('carbonFlights').value = '';
    document.getElementById('carbonDiet').value = 'meat_heavy';
    hideResult('carbonResult');
}

// Time Calculator
function calculateTime() {
    try {
        const operation = document.getElementById('timeOperation').value;
        const hours1 = parseInt(document.getElementById('timeHours1').value || '0');
        const minutes1 = parseInt(document.getElementById('timeMinutes1').value || '0');
        const seconds1 = parseInt(document.getElementById('timeSeconds1').value || '0');
        const hours2 = parseInt(document.getElementById('timeHours2').value || '0');
        const minutes2 = parseInt(document.getElementById('timeMinutes2').value || '0');
        const seconds2 = parseInt(document.getElementById('timeSeconds2').value || '0');
        
        // Convert to total seconds
        const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
        const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;
        
        let resultSeconds;
        let operationText;
        
        if (operation === 'add') {
            resultSeconds = totalSeconds1 + totalSeconds2;
            operationText = 'Addition Result';
        } else if (operation === 'subtract') {
            resultSeconds = totalSeconds1 - totalSeconds2;
            operationText = 'Subtraction Result';
        } else {
            resultSeconds = Math.abs(totalSeconds1 - totalSeconds2);
            operationText = 'Duration Between Times';
        }
        
        // Convert back to hours, minutes, seconds
        const resultHours = Math.floor(Math.abs(resultSeconds) / 3600);
        const remainingSeconds = Math.abs(resultSeconds) % 3600;
        const resultMinutes = Math.floor(remainingSeconds / 60);
        const finalSeconds = remainingSeconds % 60;
        
        const sign = resultSeconds < 0 ? '-' : '';
        
        const result = `
            <strong>${operationText}:</strong><br>
            <strong>${sign}${resultHours}h ${resultMinutes}m ${finalSeconds}s</strong><br>
            <strong>Total seconds:</strong> ${sign}${Math.abs(resultSeconds).toLocaleString()}<br>
            <strong>Total minutes:</strong> ${sign}${(Math.abs(resultSeconds) / 60).toFixed(2)}<br>
            <strong>Total hours:</strong> ${sign}${(Math.abs(resultSeconds) / 3600).toFixed(2)}
        `;
        
        showResult('timeResult', result);
    } catch (error) {
        showResult('timeResult', error.message, true);
    }
}

function resetTime() {
    document.getElementById('timeHours1').value = '';
    document.getElementById('timeMinutes1').value = '';
    document.getElementById('timeSeconds1').value = '';
    document.getElementById('timeHours2').value = '';
    document.getElementById('timeMinutes2').value = '';
    document.getElementById('timeSeconds2').value = '';
    document.getElementById('timeOperation').value = 'add';
    hideResult('timeResult');
}

// Subnet Calculator
function calculateSubnet() {
    try {
        const ipInput = document.getElementById('subnetIp').value.trim();
        const maskInput = document.getElementById('subnetMask').value.trim();
        
        if (!ipInput || !maskInput) {
            throw new Error('Both IP address and subnet mask are required');
        }
        
        // Parse IP address
        const ipParts = ipInput.split('.').map(Number);
        if (ipParts.length !== 4 || ipParts.some(part => isNaN(part) || part < 0 || part > 255)) {
            throw new Error('Invalid IP address format');
        }
        
        let cidr;
        let subnetMask;
        
        // Handle CIDR notation
        if (maskInput.startsWith('/')) {
            cidr = parseInt(maskInput.substring(1));
            if (isNaN(cidr) || cidr < 0 || cidr > 32) {
                throw new Error('Invalid CIDR notation');
            }
            // Convert CIDR to subnet mask
            const mask = 0xFFFFFFFF << (32 - cidr);
            subnetMask = [
                (mask >>> 24) & 0xFF,
                (mask >>> 16) & 0xFF,
                (mask >>> 8) & 0xFF,
                mask & 0xFF
            ];
        } else {
            // Parse subnet mask
            subnetMask = maskInput.split('.').map(Number);
            if (subnetMask.length !== 4 || subnetMask.some(part => isNaN(part) || part < 0 || part > 255)) {
                throw new Error('Invalid subnet mask format');
            }
            // Convert to CIDR
            const mask = (subnetMask[0] << 24) | (subnetMask[1] << 16) | (subnetMask[2] << 8) | subnetMask[3];
            cidr = 32 - Math.log2((~mask >>> 0) + 1);
        }
        
        // Calculate network and broadcast addresses
        const ip = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
        const mask = (subnetMask[0] << 24) | (subnetMask[1] << 16) | (subnetMask[2] << 8) | subnetMask[3];
        const network = ip & mask;
        const broadcast = network | (~mask >>> 0);
        const hostBits = 32 - cidr;
        const totalHosts = Math.pow(2, hostBits);
        const usableHosts = totalHosts - 2;
        
        // Convert back to dotted decimal
        const networkAddr = [(network >>> 24) & 0xFF, (network >>> 16) & 0xFF, (network >>> 8) & 0xFF, network & 0xFF].join('.');
        const broadcastAddr = [(broadcast >>> 24) & 0xFF, (broadcast >>> 16) & 0xFF, (broadcast >>> 8) & 0xFF, broadcast & 0xFF].join('.');
        const firstHost = [(network >>> 24) & 0xFF, (network >>> 16) & 0xFF, (network >>> 8) & 0xFF, (network & 0xFF) + 1].join('.');
        const lastHost = [(broadcast >>> 24) & 0xFF, (broadcast >>> 16) & 0xFF, (broadcast >>> 8) & 0xFF, (broadcast & 0xFF) - 1].join('.');
        
        const result = `
            <strong>Subnet Information:</strong><br>
            <strong>Network Address:</strong> ${networkAddr}/${cidr}<br>
            <strong>Subnet Mask:</strong> ${subnetMask.join('.')}<br>
            <strong>Broadcast Address:</strong> ${broadcastAddr}<br>
            <strong>First Host:</strong> ${firstHost}<br>
            <strong>Last Host:</strong> ${lastHost}<br>
            <strong>Total Hosts:</strong> ${totalHosts.toLocaleString()}<br>
            <strong>Usable Hosts:</strong> ${usableHosts.toLocaleString()}<br>
            <strong>CIDR Notation:</strong> /${cidr}
        `;
        
        showResult('subnetResult', result);
    } catch (error) {
        showResult('subnetResult', error.message, true);
    }
}

function resetSubnet() {
    document.getElementById('subnetIp').value = '';
    document.getElementById('subnetMask').value = '';
    hideResult('subnetResult');
}

// Pregnancy Calculator
function calculatePregnancy() {
    try {
        const lmpInput = document.getElementById('pregnancyLmp').value;
        if (!lmpInput) {
            throw new Error('Last menstrual period date is required');
        }
        
        const lmp = new Date(lmpInput);
        const today = new Date();
        
        if (lmp > today) {
            throw new Error('Last menstrual period cannot be in the future');
        }
        
        // Calculate due date (280 days from LMP)
        const dueDate = new Date(lmp);
        dueDate.setDate(dueDate.getDate() + 280);
        
        // Calculate current pregnancy week
        const daysSinceLmp = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(daysSinceLmp / 7);
        const days = daysSinceLmp % 7;
        
        // Determine trimester
        let trimester;
        if (weeks < 13) {
            trimester = 'First Trimester';
        } else if (weeks < 27) {
            trimester = 'Second Trimester';
        } else {
            trimester = 'Third Trimester';
        }
        
        // Days until due date
        const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
        const result = `
            <strong>Pregnancy Information:</strong><br>
            <strong>Due Date:</strong> ${dueDate.toDateString()}<br>
            <strong>Current Week:</strong> ${weeks} weeks, ${days} days<br>
            <strong>Trimester:</strong> ${trimester}<br>
            <strong>Days until due:</strong> ${daysUntilDue > 0 ? daysUntilDue : 'Overdue by ' + Math.abs(daysUntilDue)} days<br>
            <strong>Conception Date:</strong> ${new Date(lmp.getTime() + 14 * 24 * 60 * 60 * 1000).toDateString()}<br><br>
            <small>This calculation is based on a 28-day cycle. Consult your doctor for personalized care.</small>
        `;
        
        showResult('pregnancyResult', result);
    } catch (error) {
        showResult('pregnancyResult', error.message, true);
    }
}

function resetPregnancy() {
    document.getElementById('pregnancyLmp').value = '';
    hideResult('pregnancyResult');
}

// Loan Comparison Calculator
function compareLoan() {
    try {
        const amount1 = validateInput(document.getElementById('loanAmount1').value, 'Loan 1 amount');
        const rate1 = validateInput(document.getElementById('loanRate1').value, 'Loan 1 rate');
        const term1 = validateInput(document.getElementById('loanTerm1').value, 'Loan 1 term');
        const fees1 = validateInput(document.getElementById('loanFees1').value || '0', 'Loan 1 fees');
        
        const amount2 = validateInput(document.getElementById('loanAmount2').value, 'Loan 2 amount');
        const rate2 = validateInput(document.getElementById('loanRate2').value, 'Loan 2 rate');
        const term2 = validateInput(document.getElementById('loanTerm2').value, 'Loan 2 term');
        const fees2 = validateInput(document.getElementById('loanFees2').value || '0', 'Loan 2 fees');
        
        // Calculate EMI for both loans
        function calculateEMI(principal, rate, years) {
            const monthlyRate = rate / (12 * 100);
            const months = years * 12;
            return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
        }
        
        const emi1 = calculateEMI(amount1, rate1, term1);
        const totalAmount1 = emi1 * term1 * 12;
        const totalInterest1 = totalAmount1 - amount1;
        const totalCost1 = totalAmount1 + fees1;
        
        const emi2 = calculateEMI(amount2, rate2, term2);
        const totalAmount2 = emi2 * term2 * 12;
        const totalInterest2 = totalAmount2 - amount2;
        const totalCost2 = totalAmount2 + fees2;
        
        const savings = Math.abs(totalCost1 - totalCost2);
        const betterLoan = totalCost1 < totalCost2 ? 1 : 2;
        
        const result = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border border-gray-200 rounded-lg p-4 ${betterLoan === 1 ? 'bg-green-50 border-green-200' : ''}">
                    <h4 class="font-semibold text-lg mb-2">Loan Option 1 ${betterLoan === 1 ? '✓ Better' : ''}</h4>
                    <strong>Monthly EMI:</strong> $${emi1.toFixed(2)}<br>
                    <strong>Total Interest:</strong> $${totalInterest1.toLocaleString()}<br>
                    <strong>Total Cost:</strong> $${totalCost1.toLocaleString()}<br>
                    <strong>Fees:</strong> $${fees1.toLocaleString()}
                </div>
                <div class="border border-gray-200 rounded-lg p-4 ${betterLoan === 2 ? 'bg-green-50 border-green-200' : ''}">
                    <h4 class="font-semibold text-lg mb-2">Loan Option 2 ${betterLoan === 2 ? '✓ Better' : ''}</h4>
                    <strong>Monthly EMI:</strong> $${emi2.toFixed(2)}<br>
                    <strong>Total Interest:</strong> $${totalInterest2.toLocaleString()}<br>
                    <strong>Total Cost:</strong> $${totalCost2.toLocaleString()}<br>
                    <strong>Fees:</strong> $${fees2.toLocaleString()}
                </div>
            </div>
            <div class="mt-4 text-center">
                <strong>Savings with better option:</strong> $${savings.toLocaleString()}
            </div>
        `;
        
        showResult('loanCompareResult', result);
    } catch (error) {
        showResult('loanCompareResult', error.message, true);
    }
}

function resetLoanComparison() {
    document.getElementById('loanAmount1').value = '';
    document.getElementById('loanRate1').value = '';
    document.getElementById('loanTerm1').value = '';
    document.getElementById('loanFees1').value = '';
    document.getElementById('loanAmount2').value = '';
    document.getElementById('loanRate2').value = '';
    document.getElementById('loanTerm2').value = '';
    document.getElementById('loanFees2').value = '';
    hideResult('loanCompareResult');
}

// Speed Calculator
function calculateSpeed() {
    try {
        const calculateType = document.getElementById('speedCalculateType').value;
        const distance = parseFloat(document.getElementById('speedDistance').value || '0');
        const time = parseFloat(document.getElementById('speedTime').value || '0');
        const speed = parseFloat(document.getElementById('speedValue').value || '0');
        
        const distanceUnit = document.getElementById('speedDistanceUnit').value;
        const timeUnit = document.getElementById('speedTimeUnit').value;
        const speedUnit = document.getElementById('speedUnit').value;
        
        // Convert to base units (meters and seconds)
        const distanceToMeters = {
            m: 1,
            km: 1000,
            ft: 0.3048,
            mi: 1609.34
        };
        
        const timeToSeconds = {
            s: 1,
            min: 60,
            h: 3600
        };
        
        const speedToMS = {
            ms: 1,
            kmh: 1/3.6,
            mph: 0.44704,
            kn: 0.514444
        };
        
        let result;
        
        if (calculateType === 'speed') {
            if (distance <= 0 || time <= 0) {
                throw new Error('Distance and time must be positive numbers');
            }
            const distanceM = distance * distanceToMeters[distanceUnit];
            const timeS = time * timeToSeconds[timeUnit];
            const speedMS = distanceM / timeS;
            
            result = `
                <strong>Calculated Speed:</strong><br>
                <strong>${(speedMS / speedToMS[speedUnit]).toFixed(2)} ${speedUnit}</strong><br>
                <strong>Conversions:</strong><br>
                ${(speedMS).toFixed(2)} m/s<br>
                ${(speedMS * 3.6).toFixed(2)} km/h<br>
                ${(speedMS / 0.44704).toFixed(2)} mph<br>
                ${(speedMS / 0.514444).toFixed(2)} knots
            `;
        } else if (calculateType === 'distance') {
            if (speed <= 0 || time <= 0) {
                throw new Error('Speed and time must be positive numbers');
            }
            const speedMS = speed * speedToMS[speedUnit];
            const timeS = time * timeToSeconds[timeUnit];
            const distanceM = speedMS * timeS;
            
            result = `
                <strong>Calculated Distance:</strong><br>
                <strong>${(distanceM / distanceToMeters[distanceUnit]).toFixed(2)} ${distanceUnit}</strong><br>
                <strong>Conversions:</strong><br>
                ${distanceM.toFixed(2)} meters<br>
                ${(distanceM / 1000).toFixed(2)} kilometers<br>
                ${(distanceM / 0.3048).toFixed(2)} feet<br>
                ${(distanceM / 1609.34).toFixed(2)} miles
            `;
        } else {
            if (speed <= 0 || distance <= 0) {
                throw new Error('Speed and distance must be positive numbers');
            }
            const speedMS = speed * speedToMS[speedUnit];
            const distanceM = distance * distanceToMeters[distanceUnit];
            const timeS = distanceM / speedMS;
            
            const hours = Math.floor(timeS / 3600);
            const minutes = Math.floor((timeS % 3600) / 60);
            const seconds = Math.floor(timeS % 60);
            
            result = `
                <strong>Calculated Time:</strong><br>
                <strong>${(timeS / timeToSeconds[timeUnit]).toFixed(2)} ${timeUnit}</strong><br>
                <strong>Formatted:</strong><br>
                ${hours}h ${minutes}m ${seconds}s<br>
                <strong>Conversions:</strong><br>
                ${timeS.toFixed(2)} seconds<br>
                ${(timeS / 60).toFixed(2)} minutes<br>
                ${(timeS / 3600).toFixed(2)} hours
            `;
        }
        
        showResult('speedResult', result);
    } catch (error) {
        showResult('speedResult', error.message, true);
    }
}

function resetSpeed() {
    document.getElementById('speedDistance').value = '';
    document.getElementById('speedTime').value = '';
    document.getElementById('speedValue').value = '';
    document.getElementById('speedCalculateType').value = 'speed';
    document.getElementById('speedDistanceUnit').value = 'm';
    document.getElementById('speedTimeUnit').value = 's';
    document.getElementById('speedUnit').value = 'ms';
    hideResult('speedResult');
}

// Markup Calculator
function calculateMarkup() {
    try {
        const calculateType = document.getElementById('markupCalculateType').value;
        const cost = parseFloat(document.getElementById('markupCost').value || '0');
        const selling = parseFloat(document.getElementById('markupSelling').value || '0');
        const markupPercent = parseFloat(document.getElementById('markupPercentage').value || '0');
        const marginPercent = parseFloat(document.getElementById('markupMargin').value || '0');
        
        let result;
        
        if (calculateType === 'selling_price') {
            if (cost <= 0) {
                throw new Error('Cost price must be a positive number');
            }
            
            let sellingPrice;
            if (markupPercent > 0) {
                sellingPrice = cost * (1 + markupPercent / 100);
            } else if (marginPercent > 0) {
                sellingPrice = cost / (1 - marginPercent / 100);
            } else {
                throw new Error('Enter either markup percentage or profit margin');
            }
            
            const profit = sellingPrice - cost;
            const calculatedMarkup = ((sellingPrice - cost) / cost) * 100;
            const calculatedMargin = ((sellingPrice - cost) / sellingPrice) * 100;
            
            result = `
                <strong>Calculated Selling Price:</strong><br>
                <strong>$${sellingPrice.toFixed(2)}</strong><br>
                <strong>Profit:</strong> $${profit.toFixed(2)}<br>
                <strong>Markup:</strong> ${calculatedMarkup.toFixed(2)}%<br>
                <strong>Profit Margin:</strong> ${calculatedMargin.toFixed(2)}%
            `;
        } else if (calculateType === 'markup_percentage') {
            if (cost <= 0 || selling <= 0) {
                throw new Error('Both cost and selling price must be positive numbers');
            }
            
            const profit = selling - cost;
            const markup = ((selling - cost) / cost) * 100;
            const margin = ((selling - cost) / selling) * 100;
            
            result = `
                <strong>Calculated Markup:</strong><br>
                <strong>${markup.toFixed(2)}%</strong><br>
                <strong>Profit:</strong> $${profit.toFixed(2)}<br>
                <strong>Profit Margin:</strong> ${margin.toFixed(2)}%<br>
                <strong>Return on Investment:</strong> ${markup.toFixed(2)}%
            `;
        } else {
            if (selling <= 0) {
                throw new Error('Selling price must be a positive number');
            }
            
            let costPrice;
            if (markupPercent > 0) {
                costPrice = selling / (1 + markupPercent / 100);
            } else if (marginPercent > 0) {
                costPrice = selling * (1 - marginPercent / 100);
            } else {
                throw new Error('Enter either markup percentage or profit margin');
            }
            
            const profit = selling - costPrice;
            const calculatedMarkup = ((selling - costPrice) / costPrice) * 100;
            const calculatedMargin = ((selling - costPrice) / selling) * 100;
            
            result = `
                <strong>Calculated Cost Price:</strong><br>
                <strong>$${costPrice.toFixed(2)}</strong><br>
                <strong>Profit:</strong> $${profit.toFixed(2)}<br>
                <strong>Markup:</strong> ${calculatedMarkup.toFixed(2)}%<br>
                <strong>Profit Margin:</strong> ${calculatedMargin.toFixed(2)}%
            `;
        }
        
        showResult('markupResult', result);
    } catch (error) {
        showResult('markupResult', error.message, true);
    }
}

function resetMarkup() {
    document.getElementById('markupCost').value = '';
    document.getElementById('markupSelling').value = '';
    document.getElementById('markupPercentage').value = '';
    document.getElementById('markupMargin').value = '';
    document.getElementById('markupCalculateType').value = 'selling_price';
    hideResult('markupResult');
}

// Energy Calculator
function convertEnergy() {
    try {
        const value = validateInput(document.getElementById('energyFromValue').value, 'Energy value');
        const fromUnit = document.getElementById('energyFromUnit').value;
        const toUnit = document.getElementById('energyToUnit').value;
        
        if (value <= 0) {
            throw new Error('Energy value must be positive');
        }
        
        // Convert to joules first
        const toJoules = {
            joule: 1,
            kilojoule: 1000,
            calorie: 4.184,
            kilocalorie: 4184,
            btu: 1055.06,
            kwh: 3600000,
            wh: 3600,
            erg: 1e-7
        };
        
        // Convert from joules to target unit
        const fromJoules = {
            joule: 1,
            kilojoule: 0.001,
            calorie: 0.239006,
            kilocalorie: 0.000239006,
            btu: 0.000947817,
            kwh: 2.77778e-7,
            wh: 0.000277778,
            erg: 1e7
        };
        
        const joules = value * toJoules[fromUnit];
        const converted = joules * fromJoules[toUnit];
        
        const unitNames = {
            joule: 'Joules (J)',
            kilojoule: 'Kilojoules (kJ)',
            calorie: 'Calories (cal)',
            kilocalorie: 'Kilocalories (kcal)',
            btu: 'BTU',
            kwh: 'Kilowatt-hours (kWh)',
            wh: 'Watt-hours (Wh)',
            erg: 'Ergs'
        };
        
        const result = `
            <strong>Energy Conversion:</strong><br>
            <strong>${value.toLocaleString()} ${unitNames[fromUnit]}</strong><br>
            = <strong>${converted.toLocaleString()} ${unitNames[toUnit]}</strong><br><br>
            <strong>Common Conversions:</strong><br>
            ${(joules * fromJoules.joule).toLocaleString()} Joules<br>
            ${(joules * fromJoules.kilojoule).toFixed(3)} Kilojoules<br>
            ${(joules * fromJoules.calorie).toFixed(3)} Calories<br>
            ${(joules * fromJoules.kilocalorie).toFixed(6)} Kilocalories<br>
            ${(joules * fromJoules.kwh).toFixed(9)} kWh<br>
            ${(joules * fromJoules.btu).toFixed(6)} BTU
        `;
        
        showResult('energyResult', result);
    } catch (error) {
        showResult('energyResult', error.message, true);
    }
}

function resetEnergy() {
    document.getElementById('energyFromValue').value = '';
    document.getElementById('energyFromUnit').value = 'joule';
    document.getElementById('energyToUnit').value = 'joule';
    hideResult('energyResult');
}

// Utility function for copying text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            // Show temporary success message
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
        document.body.removeChild(textArea);
    }
}

// ======= NEW CALCULATORS FUNCTIONS =======

// Heart Rate Zone Calculator
function calculateHeartRateZones() {
    try {
        const age = validateInput(document.getElementById('hrAge').value, 'Age');
        const restingHR = document.getElementById('hrResting').value ? 
            validateInput(document.getElementById('hrResting').value, 'Resting Heart Rate') : 60;
        
        if (age <= 0) throw new Error('Age must be a positive number');
        if (restingHR <= 0) throw new Error('Resting heart rate must be a positive number');
        
        const maxHR = 220 - age;
        const hrReserve = maxHR - restingHR;
        
        const zones = {
            zone1: { min: Math.round(restingHR + (hrReserve * 0.5)), max: Math.round(restingHR + (hrReserve * 0.6)) },
            zone2: { min: Math.round(restingHR + (hrReserve * 0.6)), max: Math.round(restingHR + (hrReserve * 0.7)) },
            zone3: { min: Math.round(restingHR + (hrReserve * 0.7)), max: Math.round(restingHR + (hrReserve * 0.8)) },
            zone4: { min: Math.round(restingHR + (hrReserve * 0.8)), max: Math.round(restingHR + (hrReserve * 0.9)) },
            zone5: { min: Math.round(restingHR + (hrReserve * 0.9)), max: maxHR }
        };
        
        const result = `
            <strong>Maximum Heart Rate:</strong> ${maxHR} bpm<br>
            <strong>Zone 1 (50-60%):</strong> ${zones.zone1.min}-${zones.zone1.max} bpm<br>
            <strong>Zone 2 (60-70%):</strong> ${zones.zone2.min}-${zones.zone2.max} bpm<br>
            <strong>Zone 3 (70-80%):</strong> ${zones.zone3.min}-${zones.zone3.max} bpm<br>
            <strong>Zone 4 (80-90%):</strong> ${zones.zone4.min}-${zones.zone4.max} bpm<br>
            <strong>Zone 5 (90-100%):</strong> ${zones.zone5.min}-${zones.zone5.max} bpm
        `;
        
        showResult('hrZoneResult', result);
    } catch (error) {
        showResult('hrZoneResult', error.message, true);
    }
}

function resetHeartRateZones() {
    document.getElementById('hrAge').value = '';
    document.getElementById('hrResting').value = '';
    hideResult('hrZoneResult');
}

// Ideal Weight Calculator
function calculateIdealWeight() {
    try {
        const height = validateInput(document.getElementById('idealHeight').value, 'Height');
        const gender = document.getElementById('idealGender').value;
        const age = validateInput(document.getElementById('idealAge').value, 'Age');
        
        if (height <= 0) throw new Error('Height must be a positive number');
        if (!gender) throw new Error('Please select gender');
        if (age <= 0) throw new Error('Age must be a positive number');
        
        const heightInches = height / 2.54; // Convert cm to inches
        
        // Different formulas for ideal weight
        const robinson = gender === 'male' ? 
            52 + 1.9 * (heightInches - 60) : 
            49 + 1.7 * (heightInches - 60);
            
        const miller = gender === 'male' ? 
            56.2 + 1.41 * (heightInches - 60) : 
            53.1 + 1.36 * (heightInches - 60);
            
        const devine = gender === 'male' ? 
            50 + 2.3 * (heightInches - 60) : 
            45.5 + 2.3 * (heightInches - 60);
            
        const hamwi = gender === 'male' ? 
            48 + 2.7 * (heightInches - 60) : 
            45.5 + 2.2 * (heightInches - 60);
        
        const average = (robinson + miller + devine + hamwi) / 4;
        const range = { min: average * 0.9, max: average * 1.1 };
        
        const result = `
            <strong>Average Ideal Weight:</strong> ${average.toFixed(1)} kg (${(average * 2.205).toFixed(1)} lbs)<br>
            <strong>Healthy Range:</strong> ${range.min.toFixed(1)} - ${range.max.toFixed(1)} kg<br>
            <hr>
            <strong>Robinson Formula:</strong> ${robinson.toFixed(1)} kg<br>
            <strong>Miller Formula:</strong> ${miller.toFixed(1)} kg<br>
            <strong>Devine Formula:</strong> ${devine.toFixed(1)} kg<br>
            <strong>Hamwi Formula:</strong> ${hamwi.toFixed(1)} kg
        `;
        
        showResult('idealWeightResult', result);
    } catch (error) {
        showResult('idealWeightResult', error.message, true);
    }
}

function resetIdealWeight() {
    document.getElementById('idealHeight').value = '';
    document.getElementById('idealGender').value = '';
    document.getElementById('idealAge').value = '';
    hideResult('idealWeightResult');
}

// Quadratic Equation Solver
function solveQuadratic() {
    try {
        const a = validateInput(document.getElementById('quadA').value, 'Coefficient a');
        const b = validateInput(document.getElementById('quadB').value, 'Coefficient b');
        const c = validateInput(document.getElementById('quadC').value, 'Coefficient c');
        
        if (a === 0) throw new Error('Coefficient "a" cannot be zero for a quadratic equation');
        
        const discriminant = b * b - 4 * a * c;
        
        let result = `<strong>Equation:</strong> ${a}x² + ${b}x + ${c} = 0<br>`;
        result += `<strong>Discriminant:</strong> ${discriminant.toFixed(2)}<br>`;
        
        if (discriminant > 0) {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            result += `<strong>Two real solutions:</strong><br>`;
            result += `x₁ = ${x1.toFixed(4)}<br>`;
            result += `x₂ = ${x2.toFixed(4)}`;
        } else if (discriminant === 0) {
            const x = -b / (2 * a);
            result += `<strong>One real solution:</strong><br>`;
            result += `x = ${x.toFixed(4)}`;
        } else {
            const realPart = -b / (2 * a);
            const imagPart = Math.sqrt(-discriminant) / (2 * a);
            result += `<strong>Two complex solutions:</strong><br>`;
            result += `x₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i<br>`;
            result += `x₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;
        }
        
        showResult('quadResult', result);
    } catch (error) {
        showResult('quadResult', error.message, true);
    }
}

function resetQuadratic() {
    document.getElementById('quadA').value = '';
    document.getElementById('quadB').value = '';
    document.getElementById('quadC').value = '';
    hideResult('quadResult');
}

// Crypto Profit Calculator
function calculateCryptoProfit() {
    try {
        const buyPrice = validateInput(document.getElementById('cryptoBuyPrice').value, 'Buy Price');
        const sellPrice = validateInput(document.getElementById('cryptoSellPrice').value, 'Sell Price');
        const quantity = validateInput(document.getElementById('cryptoQuantity').value, 'Quantity');
        const fees = validateInput(document.getElementById('cryptoFees').value, 'Fees') / 100;
        
        if (buyPrice <= 0 || sellPrice <= 0 || quantity <= 0) {
            throw new Error('All values must be positive numbers');
        }
        
        const buyTotal = buyPrice * quantity;
        const sellTotal = sellPrice * quantity;
        
        const buyFees = buyTotal * fees;
        const sellFees = sellTotal * fees;
        const totalFees = buyFees + sellFees;
        
        const grossProfit = sellTotal - buyTotal;
        const netProfit = grossProfit - totalFees;
        const roi = (netProfit / (buyTotal + buyFees)) * 100;
        
        const breakEvenPrice = (buyPrice * (1 + fees)) / (1 - fees);
        
        const result = `
            <strong>Investment:</strong> $${(buyTotal + buyFees).toFixed(2)}<br>
            <strong>Returns:</strong> $${(sellTotal - sellFees).toFixed(2)}<br>
            <strong>Total Fees:</strong> $${totalFees.toFixed(2)}<br>
            <strong>Net Profit/Loss:</strong> $${netProfit.toFixed(2)}<br>
            <strong>ROI:</strong> ${roi.toFixed(2)}%<br>
            <strong>Break-even Price:</strong> $${breakEvenPrice.toFixed(4)}
        `;
        
        showResult('cryptoProfitResult', result);
    } catch (error) {
        showResult('cryptoProfitResult', error.message, true);
    }
}

function resetCryptoProfit() {
    document.getElementById('cryptoBuyPrice').value = '';
    document.getElementById('cryptoSellPrice').value = '';
    document.getElementById('cryptoQuantity').value = '';
    document.getElementById('cryptoFees').value = '0.1';
    hideResult('cryptoProfitResult');
}

// Data Storage Converter
function convertStorage() {
    try {
        const value = validateInput(document.getElementById('storageValue').value, 'Value');
        const fromUnit = document.getElementById('storageFromUnit').value;
        const toUnit = document.getElementById('storageToUnit').value;
        
        if (value < 0) throw new Error('Value cannot be negative');
        
        // Convert everything to bytes first
        const bytesConversion = {
            'bit': 0.125,
            'byte': 1,
            'kb': 1024,
            'mb': 1024 * 1024,
            'gb': 1024 * 1024 * 1024,
            'tb': 1024 * 1024 * 1024 * 1024,
            'pb': 1024 * 1024 * 1024 * 1024 * 1024
        };
        
        const bytes = value * bytesConversion[fromUnit];
        const result = bytes / bytesConversion[toUnit];
        
        const unitNames = {
            'bit': 'Bits',
            'byte': 'Bytes',
            'kb': 'KB',
            'mb': 'MB',
            'gb': 'GB',
            'tb': 'TB',
            'pb': 'PB'
        };
        
        const resultText = `
            <strong>Result:</strong> ${result.toLocaleString(undefined, {maximumFractionDigits: 10})} ${unitNames[toUnit]}<br>
            <strong>In Bytes:</strong> ${bytes.toLocaleString()} bytes<br>
            <strong>Scientific:</strong> ${result.toExponential(3)} ${unitNames[toUnit]}
        `;
        
        showResult('storageResult', resultText);
    } catch (error) {
        showResult('storageResult', error.message, true);
    }
}

function resetStorage() {
    document.getElementById('storageValue').value = '';
    document.getElementById('storageFromUnit').selectedIndex = 1; // byte
    document.getElementById('storageToUnit').selectedIndex = 3; // mb
    hideResult('storageResult');
}

// Love Calculator
function calculateLove() {
    try {
        const name1 = document.getElementById('loveName1').value.trim().toLowerCase();
        const name2 = document.getElementById('loveName2').value.trim().toLowerCase();
        
        if (!name1 || !name2) throw new Error('Please enter both names');
        if (name1 === name2) throw new Error('Please enter two different names');
        
        // Simple algorithm based on character codes and name characteristics
        let compatibility = 0;
        const combinedNames = name1 + name2;
        
        // Add character codes
        for (let i = 0; i < combinedNames.length; i++) {
            compatibility += combinedNames.charCodeAt(i);
        }
        
        // Add some factors for more interesting results
        compatibility += name1.length * 7;
        compatibility += name2.length * 11;
        compatibility += (name1.includes('a') || name2.includes('a')) ? 13 : 0;
        compatibility += (name1.includes('e') || name2.includes('e')) ? 17 : 0;
        compatibility += (name1.includes('i') || name2.includes('i')) ? 19 : 0;
        compatibility += (name1.includes('o') || name2.includes('o')) ? 23 : 0;
        compatibility += (name1.includes('u') || name2.includes('u')) ? 29 : 0;
        
        // Convert to percentage
        const percentage = (compatibility % 101);
        const finalPercentage = Math.max(20, percentage); // Ensure at least 20%
        
        let message = '';
        if (finalPercentage >= 80) {
            message = '💕 Perfect match! You were meant to be together!';
        } else if (finalPercentage >= 60) {
            message = '❤️ Great compatibility! Love is in the air!';
        } else if (finalPercentage >= 40) {
            message = '💖 Good potential! Give it a chance!';
        } else {
            message = '💛 Friendship might work better, but who knows?';
        }
        
        const result = `
            <div class="text-center">
                <div class="text-4xl font-bold text-pink-600 mb-2">${finalPercentage}%</div>
                <div class="text-lg font-medium text-gray-800 mb-3">${name1.charAt(0).toUpperCase() + name1.slice(1)} ❤️ ${name2.charAt(0).toUpperCase() + name2.slice(1)}</div>
                <div class="text-gray-600">${message}</div>
            </div>
        `;
        
        showResult('loveResult', result);
    } catch (error) {
        showResult('loveResult', error.message, true);
    }
}

function resetLove() {
    document.getElementById('loveName1').value = '';
    document.getElementById('loveName2').value = '';
    hideResult('loveResult');
}

// Freelance Rate Calculator
function calculateFreelanceRate() {
    try {
        const annualSalary = validateInput(document.getElementById('freelanceAnnualSalary').value, 'Annual Salary');
        const billableHours = validateInput(document.getElementById('freelanceBillableHours').value, 'Billable Hours');
        const vacationWeeks = validateInput(document.getElementById('freelanceVacation').value, 'Vacation Weeks');
        const expenses = validateInput(document.getElementById('freelanceExpenses').value, 'Business Expenses');
        const taxRate = validateInput(document.getElementById('freelanceTaxRate').value, 'Tax Rate') / 100;
        const profitMargin = validateInput(document.getElementById('freelanceProfit').value, 'Profit Margin') / 100;
        
        if (annualSalary <= 0 || billableHours <= 0) {
            throw new Error('All values must be positive numbers');
        }
        
        const workingWeeks = 52 - vacationWeeks;
        const totalBillableHours = billableHours * workingWeeks;
        
        const totalNeeded = annualSalary + expenses;
        const afterTax = totalNeeded / (1 - taxRate);
        const withProfit = afterTax * (1 + profitMargin);
        
        const hourlyRate = withProfit / totalBillableHours;
        
        const result = `
            <strong>Recommended Hourly Rate:</strong> $${hourlyRate.toFixed(2)}/hour<br>
            <strong>Total Annual Income Needed:</strong> $${withProfit.toFixed(2)}<br>
            <strong>Billable Hours per Year:</strong> ${totalBillableHours} hours<br>
            <strong>Working Weeks:</strong> ${workingWeeks} weeks<br>
            <hr>
            <strong>Breakdown:</strong><br>
            • Desired Salary: $${annualSalary.toFixed(2)}<br>
            • Business Expenses: $${expenses.toFixed(2)}<br>
            • Tax Adjustment: +${(taxRate * 100).toFixed(1)}%<br>
            • Profit Margin: +${(profitMargin * 100).toFixed(1)}%
        `;
        
        showResult('freelanceRateResult', result);
    } catch (error) {
        showResult('freelanceRateResult', error.message, true);
    }
}

function resetFreelanceRate() {
    document.getElementById('freelanceAnnualSalary').value = '';
    document.getElementById('freelanceBillableHours').value = '30';
    document.getElementById('freelanceVacation').value = '4';
    document.getElementById('freelanceExpenses').value = '';
    document.getElementById('freelanceTaxRate').value = '30';
    document.getElementById('freelanceProfit').value = '20';
    hideResult('freelanceRateResult');
}

// Pressure Converter
function convertPressure() {
    try {
        const value = parseFloat(document.getElementById('pressureValue').value);
        if (isNaN(value) || value < 0) {
            if (value < 0) throw new Error('Pressure cannot be negative');
            hideResult('pressureResult');
            return;
        }
        
        const fromUnit = document.getElementById('pressureFromUnit').value;
        const toUnit = document.getElementById('pressureToUnit').value;
        
        // Convert everything to PSI first
        const toPsi = {
            'psi': 1,
            'bar': 14.5038,
            'atm': 14.696,
            'kpa': 0.145038,
            'mpa': 145.038,
            'torr': 0.0193368,
            'mmhg': 0.0193368,
            'inhg': 0.491154
        };
        
        const psiValue = value * toPsi[fromUnit];
        const result = psiValue / toPsi[toUnit];
        
        const unitNames = {
            'psi': 'PSI',
            'bar': 'Bar',
            'atm': 'Atmosphere',
            'kpa': 'kPa',
            'mpa': 'MPa',
            'torr': 'Torr',
            'mmhg': 'mmHg',
            'inhg': 'inHg'
        };
        
        const resultText = `
            <strong>Result:</strong> ${result.toLocaleString(undefined, {maximumFractionDigits: 6})} ${unitNames[toUnit]}<br>
            <strong>In PSI:</strong> ${psiValue.toFixed(4)} PSI<br>
            <strong>Scientific:</strong> ${result.toExponential(3)} ${unitNames[toUnit]}
        `;
        
        showResult('pressureResult', resultText);
    } catch (error) {
        showResult('pressureResult', error.message, true);
    }
}

function resetPressure() {
    document.getElementById('pressureValue').value = '';
    document.getElementById('pressureFromUnit').selectedIndex = 0; // psi
    document.getElementById('pressureToUnit').selectedIndex = 1; // bar
    hideResult('pressureResult');
}

// Triangle Calculator
function toggleTriangleInputs() {
    const method = document.getElementById('triangleMethod').value;
    const baseHeight = document.getElementById('baseHeightInputs');
    const threeSides = document.getElementById('threeSidesInputs');
    const twoSidesAngle = document.getElementById('twoSidesAngleInputs');
    
    // Hide all inputs first
    baseHeight.classList.add('hidden');
    threeSides.classList.add('hidden');
    twoSidesAngle.classList.add('hidden');
    
    // Show relevant input
    if (method === 'base-height') {
        baseHeight.classList.remove('hidden');
    } else if (method === 'three-sides') {
        threeSides.classList.remove('hidden');
    } else if (method === 'two-sides-angle') {
        twoSidesAngle.classList.remove('hidden');
    }
}

function calculateTriangle() {
    try {
        const method = document.getElementById('triangleMethod').value;
        let result = '';
        
        if (method === 'base-height') {
            const base = validateInput(document.getElementById('triangleBase').value, 'Base');
            const height = validateInput(document.getElementById('triangleHeight').value, 'Height');
            
            if (base <= 0 || height <= 0) throw new Error('Base and height must be positive');
            
            const area = 0.5 * base * height;
            
            result = `
                <strong>Area:</strong> ${area.toFixed(2)} square units<br>
                <strong>Base:</strong> ${base} units<br>
                <strong>Height:</strong> ${height} units<br>
                <strong>Method:</strong> Area = ½ × base × height
            `;
            
        } else if (method === 'three-sides') {
            const a = validateInput(document.getElementById('triangleSideA').value, 'Side A');
            const b = validateInput(document.getElementById('triangleSideB').value, 'Side B');
            const c = validateInput(document.getElementById('triangleSideC').value, 'Side C');
            
            if (a <= 0 || b <= 0 || c <= 0) throw new Error('All sides must be positive');
            if (a + b <= c || a + c <= b || b + c <= a) {
                throw new Error('Invalid triangle: sum of any two sides must be greater than the third');
            }
            
            const s = (a + b + c) / 2; // semi-perimeter
            const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula
            const perimeter = a + b + c;
            
            result = `
                <strong>Area:</strong> ${area.toFixed(2)} square units<br>
                <strong>Perimeter:</strong> ${perimeter.toFixed(2)} units<br>
                <strong>Sides:</strong> ${a}, ${b}, ${c}<br>
                <strong>Method:</strong> Heron's Formula
            `;
            
        } else if (method === 'two-sides-angle') {
            const a = validateInput(document.getElementById('triangleSideSAS_A').value, 'Side A');
            const b = validateInput(document.getElementById('triangleSideSAS_B').value, 'Side B');
            const angleC = validateInput(document.getElementById('triangleAngleC').value, 'Angle C');
            
            if (a <= 0 || b <= 0) throw new Error('Sides must be positive');
            if (angleC <= 0 || angleC >= 180) throw new Error('Angle must be between 0 and 180 degrees');
            
            const angleRad = angleC * Math.PI / 180;
            const area = 0.5 * a * b * Math.sin(angleRad);
            const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angleRad)); // Law of cosines
            const perimeter = a + b + c;
            
            result = `
                <strong>Area:</strong> ${area.toFixed(2)} square units<br>
                <strong>Third Side (c):</strong> ${c.toFixed(2)} units<br>
                <strong>Perimeter:</strong> ${perimeter.toFixed(2)} units<br>
                <strong>Method:</strong> SAS (Side-Angle-Side)
            `;
        }
        
        showResult('triangleResult', result);
    } catch (error) {
        showResult('triangleResult', error.message, true);
    }
}

function resetTriangle() {
    document.getElementById('triangleBase').value = '';
    document.getElementById('triangleHeight').value = '';
    document.getElementById('triangleSideA').value = '';
    document.getElementById('triangleSideB').value = '';
    document.getElementById('triangleSideC').value = '';
    document.getElementById('triangleSideSAS_A').value = '';
    document.getElementById('triangleSideSAS_B').value = '';
    document.getElementById('triangleAngleC').value = '';
    document.getElementById('triangleMethod').selectedIndex = 0;
    toggleTriangleInputs();
    hideResult('triangleResult');
}

// Fraction Calculator  
function calculateFraction() {
    try {
        const num1 = validateInput(document.getElementById('fraction1Num').value, 'First numerator');
        const den1 = validateInput(document.getElementById('fraction1Den').value, 'First denominator');
        const num2 = validateInput(document.getElementById('fraction2Num').value, 'Second numerator');
        const den2 = validateInput(document.getElementById('fraction2Den').value, 'Second denominator');
        const operation = document.getElementById('fractionOperation').value;
        
        if (den1 === 0 || den2 === 0) throw new Error('Denominators cannot be zero');
        
        let resultNum, resultDen;
        let operationSymbol;
        
        switch (operation) {
            case 'add':
                resultNum = num1 * den2 + num2 * den1;
                resultDen = den1 * den2;
                operationSymbol = '+';
                break;
            case 'subtract':
                resultNum = num1 * den2 - num2 * den1;
                resultDen = den1 * den2;
                operationSymbol = '−';
                break;
            case 'multiply':
                resultNum = num1 * num2;
                resultDen = den1 * den2;
                operationSymbol = '×';
                break;
            case 'divide':
                if (num2 === 0) throw new Error('Cannot divide by zero');
                resultNum = num1 * den2;
                resultDen = den1 * num2;
                operationSymbol = '÷';
                break;
        }
        
        // Simplify fraction
        const gcd = findGCD(Math.abs(resultNum), Math.abs(resultDen));
        const simplifiedNum = resultNum / gcd;
        const simplifiedDen = resultDen / gcd;
        
        // Handle negative fractions
        const finalNum = simplifiedDen < 0 ? -simplifiedNum : simplifiedNum;
        const finalDen = Math.abs(simplifiedDen);
        
        const decimal = finalNum / finalDen;
        
        const result = `
            <strong>Expression:</strong> ${num1}/${den1} ${operationSymbol} ${num2}/${den2}<br>
            <strong>Result:</strong> ${finalNum}/${finalDen}<br>
            <strong>Decimal:</strong> ${decimal.toFixed(6)}<br>
            ${finalNum !== resultNum ? `<strong>Unsimplified:</strong> ${resultNum}/${resultDen}<br>` : ''}
            <strong>Mixed Number:</strong> ${toMixedNumber(finalNum, finalDen)}
        `;
        
        showResult('fractionResult', result);
    } catch (error) {
        showResult('fractionResult', error.message, true);
    }
}

function findGCD(a, b) {
    return b === 0 ? a : findGCD(b, a % b);
}

function toMixedNumber(num, den) {
    if (Math.abs(num) < Math.abs(den)) {
        return `${num}/${den}`;
    }
    const whole = Math.floor(Math.abs(num) / Math.abs(den));
    const remainder = Math.abs(num) % Math.abs(den);
    const sign = num < 0 ? '-' : '';
    if (remainder === 0) {
        return `${sign}${whole}`;
    }
    return `${sign}${whole} ${remainder}/${den}`;
}

function resetFraction() {
    document.getElementById('fraction1Num').value = '';
    document.getElementById('fraction1Den').value = '';
    document.getElementById('fraction2Num').value = '';
    document.getElementById('fraction2Den').value = '';
    document.getElementById('fractionOperation').selectedIndex = 0;
    hideResult('fractionResult');
}

// Bitcoin Mining Calculator
function calculateBitcoinMining() {
    try {
        const hashRate = validateInput(document.getElementById('miningHashRate').value, 'Hash Rate') * 1e12; // Convert TH/s to H/s
        const power = validateInput(document.getElementById('miningPower').value, 'Power Consumption');
        const electricityCost = validateInput(document.getElementById('miningElectricityCost').value, 'Electricity Cost');
        const btcPrice = validateInput(document.getElementById('miningBtcPrice').value, 'Bitcoin Price');
        const poolFee = validateInput(document.getElementById('miningPoolFee').value, 'Pool Fee') / 100;
        const difficulty = validateInput(document.getElementById('miningDifficulty').value, 'Network Difficulty');
        
        if (hashRate <= 0 || power <= 0 || btcPrice <= 0) {
            throw new Error('All values must be positive numbers');
        }
        
        // Bitcoin mining calculations
        const blocksPerDay = 144; // Approximate blocks per day
        const btcPerBlock = 3.125; // Current reward after halving
        const totalNetworkHashRate = difficulty * Math.pow(2, 32) / 600; // Approximate network hash rate
        
        const dailyBTC = (hashRate / totalNetworkHashRate) * blocksPerDay * btcPerBlock;
        const dailyGrossRevenue = dailyBTC * btcPrice;
        const dailyNetRevenue = dailyGrossRevenue * (1 - poolFee);
        
        const dailyPowerCost = (power / 1000) * 24 * electricityCost; // kWh * hours * cost
        const dailyProfit = dailyNetRevenue - dailyPowerCost;
        
        const monthlyProfit = dailyProfit * 30;
        const yearlyProfit = dailyProfit * 365;
        
        const roi = dailyNetRevenue > 0 ? (dailyProfit / dailyNetRevenue) * 100 : -100;
        
        const result = `
            <strong>Daily Mining Results:</strong><br>
            • BTC Mined: ${dailyBTC.toFixed(8)} BTC<br>
            • Gross Revenue: $${dailyGrossRevenue.toFixed(2)}<br>
            • Net Revenue (after pool fees): $${dailyNetRevenue.toFixed(2)}<br>
            • Electricity Cost: $${dailyPowerCost.toFixed(2)}<br>
            • <strong>Daily Profit: $${dailyProfit.toFixed(2)}</strong><br>
            <hr>
            <strong>Projections:</strong><br>
            • Monthly Profit: $${monthlyProfit.toFixed(2)}<br>
            • Yearly Profit: $${yearlyProfit.toFixed(2)}<br>
            • Profit Margin: ${roi.toFixed(1)}%<br>
            <hr>
            <strong>Network Stats:</strong><br>
            • Your Hash Rate: ${(hashRate / 1e12).toFixed(2)} TH/s<br>
            • Network Hash Rate: ${(totalNetworkHashRate / 1e18).toFixed(2)} EH/s<br>
            • Your Network Share: ${((hashRate / totalNetworkHashRate) * 100).toExponential(2)}%
        `;
        
        showResult('bitcoinMiningResult', result);
    } catch (error) {
        showResult('bitcoinMiningResult', error.message, true);
    }
}

function resetBitcoinMining() {
    document.getElementById('miningHashRate').value = '';
    document.getElementById('miningPower').value = '';
    document.getElementById('miningElectricityCost').value = '0.12';
    document.getElementById('miningBtcPrice').value = '65000';
    document.getElementById('miningPoolFee').value = '1';
    document.getElementById('miningDifficulty').value = '83000000000000';
    hideResult('bitcoinMiningResult');
}

// Circle Calculator
function toggleCircleInputs() {
    const inputType = document.getElementById('circleInputType').value;
    
    // Hide all inputs
    document.getElementById('radiusInput').classList.add('hidden');
    document.getElementById('diameterInput').classList.add('hidden');
    document.getElementById('circumferenceInput').classList.add('hidden');
    document.getElementById('areaInput').classList.add('hidden');
    
    // Show selected input
    document.getElementById(inputType + 'Input').classList.remove('hidden');
}

function calculateCircle() {
    try {
        const inputType = document.getElementById('circleInputType').value;
        let radius;
        
        // Get radius from different inputs
        switch (inputType) {
            case 'radius':
                radius = validateInput(document.getElementById('circleRadius').value, 'Radius');
                break;
            case 'diameter':
                const diameter = validateInput(document.getElementById('circleDiameter').value, 'Diameter');
                radius = diameter / 2;
                break;
            case 'circumference':
                const circumference = validateInput(document.getElementById('circleCircumference').value, 'Circumference');
                radius = circumference / (2 * Math.PI);
                break;
            case 'area':
                const area = validateInput(document.getElementById('circleArea').value, 'Area');
                radius = Math.sqrt(area / Math.PI);
                break;
        }
        
        if (radius <= 0) throw new Error('Value must be positive');
        
        // Calculate all circle properties
        const diameter = radius * 2;
        const circumference = 2 * Math.PI * radius;
        const area = Math.PI * radius * radius;
        
        const result = `
            <strong>Circle Properties:</strong><br>
            • <strong>Radius:</strong> ${radius.toFixed(4)} units<br>
            • <strong>Diameter:</strong> ${diameter.toFixed(4)} units<br>
            • <strong>Circumference:</strong> ${circumference.toFixed(4)} units<br>
            • <strong>Area:</strong> ${area.toFixed(4)} square units<br>
            <hr>
            <strong>Formulas Used:</strong><br>
            • Area = π × r² = ${area.toFixed(4)}<br>
            • Circumference = 2π × r = ${circumference.toFixed(4)}<br>
            • π ≈ ${Math.PI.toFixed(6)}
        `;
        
        showResult('circleResult', result);
    } catch (error) {
        showResult('circleResult', error.message, true);
    }
}

function resetCircle() {
    document.getElementById('circleRadius').value = '';
    document.getElementById('circleDiameter').value = '';
    document.getElementById('circleCircumference').value = '';
    document.getElementById('circleArea').value = '';
    document.getElementById('circleInputType').selectedIndex = 0;
    toggleCircleInputs();
    hideResult('circleResult');
}

// Hourly vs Salary Calculator
function switchJobType(type) {
    const hourlyTab = document.getElementById('hourlyTab');
    const salaryTab = document.getElementById('salaryTab');
    const hourlyInputs = document.getElementById('hourlyInputs');
    const salaryInputs = document.getElementById('salaryInputs');
    
    if (type === 'hourly') {
        hourlyTab.classList.add('bg-blue-600', 'text-white');
        hourlyTab.classList.remove('text-gray-600');
        salaryTab.classList.remove('bg-blue-600', 'text-white');
        salaryTab.classList.add('text-gray-600');
        
        hourlyInputs.classList.remove('hidden');
        salaryInputs.classList.add('hidden');
    } else {
        salaryTab.classList.add('bg-blue-600', 'text-white');
        salaryTab.classList.remove('text-gray-600');
        hourlyTab.classList.remove('bg-blue-600', 'text-white');
        hourlyTab.classList.add('text-gray-600');
        
        salaryInputs.classList.remove('hidden');
        hourlyInputs.classList.add('hidden');
    }
}

function calculateHourlySalary() {
    try {
        const vacationDays = validateInput(document.getElementById('vacationDays').value, 'Vacation Days');
        const healthBenefits = validateInput(document.getElementById('healthBenefits').value, 'Health Benefits');
        const retirementMatch = validateInput(document.getElementById('retirementMatch').value, 'Retirement Match') / 100;
        const otherBenefits = validateInput(document.getElementById('otherBenefits').value, 'Other Benefits');
        
        const workDaysPerYear = 260 - vacationDays; // Assuming 5 days/week, 52 weeks
        const workHoursPerYear = workDaysPerYear * 8;
        const annualHealthBenefits = healthBenefits * 12;
        const annualOtherBenefits = otherBenefits * 12;
        
        let result = '';
        
        if (!document.getElementById('hourlyInputs').classList.contains('hidden')) {
            // Hourly calculation
            const hourlyRate = validateInput(document.getElementById('hourlyRate').value, 'Hourly Rate');
            const hoursPerWeek = validateInput(document.getElementById('hoursPerWeek').value, 'Hours per Week');
            
            if (hourlyRate <= 0 || hoursPerWeek <= 0) {
                throw new Error('Hourly rate and hours must be positive');
            }
            
            const annualSalary = hourlyRate * hoursPerWeek * 52;
            const annualRetirementMatch = annualSalary * retirementMatch;
            const totalCompensation = annualSalary + annualHealthBenefits + annualRetirementMatch + annualOtherBenefits;
            
            result = `
                <strong>Hourly Position Analysis:</strong><br>
                • Base Pay: $${hourlyRate}/hour × ${hoursPerWeek} hrs/week<br>
                • <strong>Annual Base Salary:</strong> $${annualSalary.toLocaleString()}<br>
                • Health Benefits: $${annualHealthBenefits.toLocaleString()}/year<br>
                • 401k Match (${(retirementMatch * 100).toFixed(1)}%): $${annualRetirementMatch.toLocaleString()}<br>
                • Other Benefits: $${annualOtherBenefits.toLocaleString()}<br>
                • <strong>Total Compensation: $${totalCompensation.toLocaleString()}</strong><br>
                <hr>
                <strong>Equivalent Salary Rate:</strong> $${(totalCompensation / workHoursPerYear).toFixed(2)}/hour
            `;
        } else {
            // Salary calculation
            const annualSalary = validateInput(document.getElementById('annualSalary').value, 'Annual Salary');
            
            if (annualSalary <= 0) {
                throw new Error('Annual salary must be positive');
            }
            
            const annualRetirementMatch = annualSalary * retirementMatch;
            const totalCompensation = annualSalary + annualHealthBenefits + annualRetirementMatch + annualOtherBenefits;
            const effectiveHourlyRate = totalCompensation / workHoursPerYear;
            
            result = `
                <strong>Salary Position Analysis:</strong><br>
                • <strong>Base Annual Salary:</strong> $${annualSalary.toLocaleString()}<br>
                • Health Benefits: $${annualHealthBenefits.toLocaleString()}/year<br>
                • 401k Match (${(retirementMatch * 100).toFixed(1)}%): $${annualRetirementMatch.toLocaleString()}<br>
                • Other Benefits: $${annualOtherBenefits.toLocaleString()}<br>
                • <strong>Total Compensation: $${totalCompensation.toLocaleString()}</strong><br>
                <hr>
                <strong>Effective Hourly Rate:</strong> $${effectiveHourlyRate.toFixed(2)}/hour<br>
                <strong>Working Hours:</strong> ${workHoursPerYear.toLocaleString()} hours/year
            `;
        }
        
        showResult('hourlySalaryResult', result);
    } catch (error) {
        showResult('hourlySalaryResult', error.message, true);
    }
}

function resetHourlySalary() {
    document.getElementById('hourlyRate').value = '';
    document.getElementById('hoursPerWeek').value = '40';
    document.getElementById('annualSalary').value = '';
    document.getElementById('vacationDays').value = '10';
    document.getElementById('healthBenefits').value = '0';
    document.getElementById('retirementMatch').value = '0';
    document.getElementById('otherBenefits').value = '0';
    hideResult('hourlySalaryResult');
}

// Hash Generator
async function generateHashes() {
    try {
        const inputText = document.getElementById('hashInput').value;
        if (!inputText.trim()) throw new Error('Please enter text to hash');
        
        const generateMD5 = document.getElementById('generateMD5').checked;
        const generateSHA1 = document.getElementById('generateSHA1').checked;
        const generateSHA256 = document.getElementById('generateSHA256').checked;
        const generateSHA512 = document.getElementById('generateSHA512').checked;
        
        if (!generateMD5 && !generateSHA1 && !generateSHA256 && !generateSHA512) {
            throw new Error('Please select at least one hash algorithm');
        }
        
        let result = '<strong>Generated Hashes:</strong><br><br>';
        
        // Note: For a real implementation, you'd need crypto libraries
        // This is a simplified example showing the structure
        if (generateMD5) {
            const md5Hash = await simpleHash(inputText, 'MD5');
            result += `<strong>MD5:</strong><br><code style="word-break: break-all; font-family: monospace; background: #f3f4f6; padding: 8px; border-radius: 4px; display: block; margin-bottom: 10px;">${md5Hash}</code>`;
        }
        
        if (generateSHA1) {
            const sha1Hash = await simpleHash(inputText, 'SHA-1');
            result += `<strong>SHA-1:</strong><br><code style="word-break: break-all; font-family: monospace; background: #f3f4f6; padding: 8px; border-radius: 4px; display: block; margin-bottom: 10px;">${sha1Hash}</code>`;
        }
        
        if (generateSHA256) {
            const sha256Hash = await simpleHash(inputText, 'SHA-256');
            result += `<strong>SHA-256:</strong><br><code style="word-break: break-all; font-family: monospace; background: #f3f4f6; padding: 8px; border-radius: 4px; display: block; margin-bottom: 10px;">${sha256Hash}</code>`;
        }
        
        if (generateSHA512) {
            const sha512Hash = await simpleHash(inputText, 'SHA-512');
            result += `<strong>SHA-512:</strong><br><code style="word-break: break-all; font-family: monospace; background: #f3f4f6; padding: 8px; border-radius: 4px; display: block; margin-bottom: 10px;">${sha512Hash}</code>`;
        }
        
        result += '<br><em>Note: Hashes generated using Web Crypto API</em>';
        
        showResult('hashResult', result);
    } catch (error) {
        showResult('hashResult', error.message, true);
    }
}

async function simpleHash(text, algorithm) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function resetHash() {
    document.getElementById('hashInput').value = '';
    document.getElementById('generateMD5').checked = true;
    document.getElementById('generateSHA1').checked = true;
    document.getElementById('generateSHA256').checked = true;
    document.getElementById('generateSHA512').checked = false;
    hideResult('hashResult');
}

// Random Team Generator
function generateRandomTeams() {
    try {
        const participantText = document.getElementById('participantNames').value.trim();
        const numberOfTeams = validateInput(document.getElementById('numberOfTeams').value, 'Number of Teams');
        const teamNamesText = document.getElementById('teamNames').value.trim();
        const balancedTeams = document.getElementById('balancedTeams').checked;
        const allowEmptyTeams = document.getElementById('allowEmptyTeams').checked;
        
        if (!participantText) throw new Error('Please enter participant names');
        if (numberOfTeams <= 0) throw new Error('Number of teams must be positive');
        
        const participants = participantText.split('\n')
            .map(name => name.trim())
            .filter(name => name.length > 0);
            
        if (participants.length === 0) throw new Error('Please enter at least one participant');
        
        const teamNames = teamNamesText ? 
            teamNamesText.split('\n').map(name => name.trim()).filter(name => name.length > 0) :
            Array.from({length: numberOfTeams}, (_, i) => `Team ${i + 1}`);
            
        // Shuffle participants
        const shuffledParticipants = [...participants];
        for (let i = shuffledParticipants.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
        }
        
        // Create teams
        const teams = Array.from({length: numberOfTeams}, (_, i) => ({
            name: teamNames[i] || `Team ${i + 1}`,
            members: []
        }));
        
        if (balancedTeams) {
            // Distribute participants evenly
            shuffledParticipants.forEach((participant, index) => {
                teams[index % numberOfTeams].members.push(participant);
            });
        } else {
            // Random distribution
            shuffledParticipants.forEach(participant => {
                const randomTeamIndex = Math.floor(Math.random() * numberOfTeams);
                teams[randomTeamIndex].members.push(participant);
            });
        }
        
        // Filter out empty teams if not allowed
        const finalTeams = allowEmptyTeams ? teams : teams.filter(team => team.members.length > 0);
        
        let result = '<strong>Generated Teams:</strong><br><br>';
        
        finalTeams.forEach((team, index) => {
            const teamColor = ['bg-blue-50 border-blue-200', 'bg-green-50 border-green-200', 
                              'bg-purple-50 border-purple-200', 'bg-orange-50 border-orange-200',
                              'bg-red-50 border-red-200', 'bg-indigo-50 border-indigo-200',
                              'bg-yellow-50 border-yellow-200', 'bg-pink-50 border-pink-200'][index % 8];
            
            result += `<div style="margin-bottom: 16px; padding: 12px; border: 2px solid; border-radius: 8px;" class="${teamColor}">`;
            result += `<strong style="font-size: 18px; color: #374151;">${team.name}</strong><br>`;
            result += `<span style="color: #6b7280; font-size: 14px;">${team.members.length} member(s)</span><br><br>`;
            
            if (team.members.length > 0) {
                team.members.forEach((member, memberIndex) => {
                    result += `<span style="display: inline-block; background: white; padding: 4px 8px; margin: 2px; border-radius: 4px; border: 1px solid #e5e7eb;">${member}</span>`;
                });
            } else {
                result += '<em style="color: #9ca3af;">No members assigned</em>';
            }
            
            result += '</div>';
        });
        
        result += `<br><strong>Summary:</strong> ${participants.length} participants divided into ${finalTeams.length} teams`;
        
        showResult('teamResult', result);
    } catch (error) {
        showResult('teamResult', error.message, true);
    }
}

function resetTeamGenerator() {
    document.getElementById('participantNames').value = '';
    document.getElementById('numberOfTeams').value = '2';
    document.getElementById('teamNames').value = '';
    document.getElementById('balancedTeams').checked = true;
    document.getElementById('allowEmptyTeams').checked = false;
    document.getElementById('participantCount').textContent = '0';
    hideResult('teamResult');
}
