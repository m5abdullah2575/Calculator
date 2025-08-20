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
                const targetSection = document.getElementById(category) || 
                                    document.querySelector(`section[id*="${category}"]`);
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
