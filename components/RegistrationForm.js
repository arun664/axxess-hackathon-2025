import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [otherInsuranceProvider, setOtherInsuranceProvider] = useState('');
  const [groupNumber, setGroupNumber] = useState('');
  const [insuranceId, setInsuranceId] = useState('');
  const [currentMedication, setCurrentMedication] = useState('');
  const [allergies, setAllergies] = useState('');
  const [pastSurgeries, setPastSurgeries] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');
  const [insuranceProviderError, setInsuranceProviderError] = useState('');
  const [groupNumberError, setGroupNumberError] = useState('');
  const [insuranceIdError, setInsuranceIdError] = useState('');

  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required.');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Username validation
  const validateUsername = (username) => {
    if (!username) {
      setUsernameError('Username is required.');
      return false;
    } else if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters long.');
      return false;
    }
    setUsernameError('');
    return true;
  };

  // Password validation
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setPasswordError('Password must be at least 8 characters long.');
      return false;
    } else if (!hasUpperCase) {
      setPasswordError('Password must contain at least one uppercase letter.');
      return false;
    } else if (!hasLowerCase) {
      setPasswordError('Password must contain at least one lowercase letter.');
      return false;
    } else if (!hasNumber) {
      setPasswordError('Password must contain at least one number.');
      return false;
    } else if (!hasSpecialChar) {
      setPasswordError('Password must contain at least one special character.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const validateFirstName = (name) => {
    if (!name) {
      setFirstNameError('First name is required.');
      return false;
    }
    setFirstNameError('');
    return true;
  };

  const validateLastName = (name) => {
    if (!name) {
      setLastNameError('Last name is required.');
      return false;
    }
    setLastNameError('');
    return true;
  };

  const validateDob = (dob) => {
    if (!dob) {
      setDobError('Date of birth is required.');
      return false;
    }
    setDobError('');
    return true;
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!number) {
      setPhoneNumberError('Phone number is required.');
      return false;
    } else if (!phoneRegex.test(number)) {
      setPhoneNumberError('Please enter a valid phone number.');
      return false;
    }
    setPhoneNumberError('');
    return true;
  };

  const validateZipCode = (zip) => {
    const zipRegex = /^[0-9]{5}$/;
    if (!zip) {
      setZipCodeError('Zip code is required.');
      return false;
    } else if (!zipRegex.test(zip)) {
      setZipCodeError('Please enter a valid zip code.');
      return false;
    }
    setZipCodeError('');
    return true;
  };

  const validateInsuranceProvider = (provider) => {
    if (!provider) {
      setInsuranceProviderError('Insurance provider is required.');
      return false;
    }
    setInsuranceProviderError('');
    return true;
  };

  const validateGroupNumber = (group) => {
    if (!group) {
      setGroupNumberError('Group number is required.');
      return false;
    }
    setGroupNumberError('');
    return true;
  };

  const validateInsuranceId = (id) => {
    if (!id) {
      setInsuranceIdError('Insurance ID is required.');
      return false;
    }
    setInsuranceIdError('');
    return true;
  };

  const handleRegister = async () => {
    toast.dismiss(); // Dismiss any existing toasts
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
          firstName,
          lastName,
          dob,
          gender,
          phoneNumber,
          address,
          zipCode,
          city,
          state,
          country,
          insuranceProvider: insuranceProvider === 'other' ? otherInsuranceProvider : insuranceProvider,
          groupNumber,
          insuranceId,
          currentMedication,
          allergies,
          pastSurgeries,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);

        // Clear form fields
        setEmail('');
        setPassword('');
        setUserName('');
        setFirstName('');
        setLastName('');
        setDob('');
        setGender('');
        setPhoneNumber('');
        setAddress('');
        setZipCode('');
        setCity('');
        setState('');
        setCountry('');
        setInsuranceProvider('');
        setOtherInsuranceProvider('');
        setGroupNumber('');
        setInsuranceId('');
        setCurrentMedication('');
        setAllergies('');
        setPastSurgeries('');

        // Redirect to login page
        router.push('/login');
      } else {
        toast.error(result.error); // Show error message
      }
    } catch (err) {
      toast.error('There was an issue registering the user'); // Show general error
    }
  };

  const isBasicInfoValid = firstName && lastName && dob && phoneNumber && address && zipCode && city && state && country && !firstNameError && !lastNameError && !dobError && !phoneNumberError && !zipCodeError;
  const isInsuranceInfoValid = insuranceProvider && (insuranceProvider !== 'other' || otherInsuranceProvider) && groupNumber && insuranceId && !insuranceProviderError && !groupNumberError && !insuranceIdError;
  const isFormValid = email && username && password && isBasicInfoValid && isInsuranceInfoValid && !emailError && !usernameError && !passwordError;

  const nextStep = () => {
    if (currentStep === 1 && isBasicInfoValid) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2 && isInsuranceInfoValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-pink-600 h-2.5 rounded-full" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
        </div>
        {currentStep === 1 && (
      <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Basic Information</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="Username"
        id="username"
        value={username}
        onChange={(e) => {
          setUserName(e.target.value);
          validateUsername(e.target.value); // Real-time validation
        }}
        className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black dark:bg-gray-900 dark:text-white"
      />
      {usernameError && <p className="text-red-500 text-sm mt-2">{usernameError}</p>}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value); // Real-time validation
        }}
        className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black dark:bg-gray-900 dark:text-white"
      />
      {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        id="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value); // Real-time validation
        }}
        className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black dark:bg-gray-900 dark:text-white"
      />
      {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            <label htmlFor="firstName" className="text-black">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                validateFirstName(e.target.value);
              }}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />
            {firstNameError && <p className="text-red-500 text-sm mt-2">{firstNameError}</p>}

            <label htmlFor="lastName" className="text-black">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              id="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                validateLastName(e.target.value);
              }}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />
            {lastNameError && <p className="text-red-500 text-sm mt-2">{lastNameError}</p>}

            <label htmlFor="dob" className="text-black">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                validateDob(e.target.value);
              }}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />
            {dobError && <p className="text-red-500 text-sm mt-2">{dobError}</p>}

            <label htmlFor="gender" className="text-black">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label htmlFor="phoneNumber" className="text-black">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                validatePhoneNumber(e.target.value);
              }}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />
            {phoneNumberError && <p className="text-red-500 text-sm mt-2">{phoneNumberError}</p>}

            <label htmlFor="address" className="text-black">Address</label>
            <input
              type="text"
              placeholder="Address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />

            <label htmlFor="zipCode" className="text-black">Zip Code</label>
            <input
              type="text"
              placeholder="Zip Code"
              id="zipCode"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
                validateZipCode(e.target.value);
              }}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />
            {zipCodeError && <p className="text-red-500 text-sm mt-2">{zipCodeError}</p>}

            <label htmlFor="city" className="text-black">City</label>
            <input
              type="text"
              placeholder="City"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />

            <label htmlFor="state" className="text-black">State</label>
            <input
              type="text"
              placeholder="State"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />

            <label htmlFor="country" className="text-black">Country</label>
            <input
              type="text"
              placeholder="Country"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />

            <button
              onClick={nextStep}
              className={`bg-pink-600 text-white p-3 rounded w-full hover:bg-pink-700 transition duration-200 ${!isBasicInfoValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isBasicInfoValid}
            >
              Next
            </button>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Insurance Details</h2>
            <label htmlFor="insuranceProvider" className="text-black">Insurance Provider</label>
            <select
              id="insuranceProvider"
              value={insuranceProvider}
              onChange={(e) => setInsuranceProvider(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            >
              <option value="">Select Insurance Provider</option>
              <option value="provider1">Atena</option>
              <option value="provider2">Blue Cross Blue Shield</option>
              <option value="provider3">Cigna</option>
              <option value="provider3">United Healthcare</option>
              <option value="other">Other</option>
            </select>
            {insuranceProvider === 'other' && (
              <input
                type="text"
                placeholder="Enter the insurance provider"
                value={otherInsuranceProvider}
                onChange={(e) => {
                  setOtherInsuranceProvider(e.target.value);
                  validateInsuranceProvider(e.target.value);
                }}
                className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
              />
            )}
            {insuranceProviderError && <p className="text-red-500 text-sm mt-2">{insuranceProviderError}</p>}

            <label htmlFor="groupNumber" className="text-black">Group #</label>
            <input
              type="text"
              placeholder="Group #"
              id="groupNumber"
              value={groupNumber}
              onChange={(e) => {
                setGroupNumber(e.target.value);
                validateGroupNumber(e.target.value);
              }}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />
            {groupNumberError && <p className="text-red-500 text-sm mt-2">{groupNumberError}</p>}

            <label htmlFor="insuranceId" className="text-black">ID #</label>
            <input
              type="text"
              placeholder="ID #"
              id="insuranceId"
              value={insuranceId}
              onChange={(e) => {
                setInsuranceId(e.target.value);
                validateInsuranceId(e.target.value);
              }}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />
            {insuranceIdError && <p className="text-red-500 text-sm mt-2">{insuranceIdError}</p>}

            <button
              onClick={prevStep}
              className="bg-gray-600 text-white p-3 rounded w-full hover:bg-gray-700 transition duration-200 mb-4"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              className={`bg-pink-600 text-white p-3 rounded w-full hover:bg-pink-700 transition duration-200 ${!isInsuranceInfoValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isInsuranceInfoValid}
            >
              Next
            </button>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Medical History</h2>
            <label htmlFor="currentMedication" className="text-black">Current Medication</label>
            <textarea
              placeholder="Current Medication"
              id="currentMedication"
              value={currentMedication}
              onChange={(e) => setCurrentMedication(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />

            <label htmlFor="allergies" className="text-black">Allergies</label>
            <textarea
              placeholder="Allergies"
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />

            <label htmlFor="pastSurgeries" className="text-black">Past Surgeries</label>
            <textarea
              placeholder="Past Surgeries"
              id="pastSurgeries"
              value={pastSurgeries}
              onChange={(e) => setPastSurgeries(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-black"
            />

            <button
              onClick={prevStep}
              className="bg-gray-600 text-white p-3 rounded w-full hover:bg-gray-700 transition duration-200 mb-4"
            >
              Previous
            </button>
            <button
              onClick={handleRegister}
              disabled={!isFormValid}
              className={`bg-pink-600 text-white p-3 rounded w-full hover:bg-pink-700 transition duration-200 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;