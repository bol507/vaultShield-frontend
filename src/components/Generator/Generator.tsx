import { useContext, useState } from 'react';
import { btnDefault } from 'styles/tailwind.classes';
import './CharacterGenerator.css';
import { NotificationContext } from 'contexts/notificationContext';

interface CharacterOptions {
  capital: boolean;
  tiny: boolean;
  numbers: boolean;
  signs: boolean;
  characterLength: number;
}

const Generator = () => {
  const { showNotification } = useContext(NotificationContext);
  const [characterList, setCharacterList] = useState([]);
  const [characterOptions, setCharacterOptions] = useState<CharacterOptions>({
    capital: true,
    tiny: true,
    numbers: true,
    signs: false,
    characterLength: 8
  });

  const generateRandomText = (characterCount: number) => {
    let characters = '';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let result = '';
    let currentIndex = 0;

    if (characterOptions.capital) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (characterOptions.tiny) {
      characters += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (characterOptions.numbers) {
      characters += '0123456789';
    }
    if (characterOptions.signs) {
      characters += '!@#$%^&*()';
    }

    if (characters === '') {
      showNotification({
        message: 'Error: You must select at least one type of character.',
        variant: 'danger'
      });
      return;
    }

    const interval = setInterval(() => {
      if (currentIndex < characterCount) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const character = characters.charAt(randomIndex);
        result += character;

        setCharacterList((prevList) => [...prevList, character]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleClick = () => {
    setCharacterList([]);

    if (!isNaN(characterOptions.characterLength)) {
      generateRandomText(characterOptions.characterLength);
    }
  };

  const handleCharacterLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterOptions((prevOptions) => ({
      ...prevOptions,
      characterLength: parseInt(e.target.value)
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(characterList.join(''));
  };

  const handleCharacterOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: keyof CharacterOptions
  ) => {
    setCharacterOptions((prevOptions) => ({
      ...prevOptions,
      [option]: e.target.checked
    }));
  };

  return (
    <div>
      <h2 className="text-2xl">Unique password generator</h2>
      <p>Generate strong and unique passwords with a click of the button</p>

      <div className="flex justify-center items-center w-6/12 mx-auto px-4">
        <div className=" border-cinder-900 hover:border-cinder-800 border-b-2 w-full ">
          <ul
            id="character-list"
            className="character-list inline-block text-xl "
          >
            {characterList.map((character, index) => (
              <li key={index} className="inline-block character-item">
                {character}
              </li>
            ))}
          </ul>
        </div>

        <svg
          ariaHidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          version="1.1"
          className="w-8 h-8 fill-current"
          onClick={handleClick}
        >
          <path d="M18 15.5H14V11.5H15.5V13.4747C16.3951 12.0644 16.5 10.6338 16.5 10C16.5 6.41015 13.5898 3.5 9.99999 3.5C9.25038 3.5 8.5304 3.62689 7.86036 3.86037L6.707 2.70701C7.71129 2.25283 8.82611 2 9.99999 2C14.4183 2 18 5.58172 18 10C18 11.0128 17.7006 12.7479 16.9134 14H18V15.5Z"></path>{' '}
          <path d="M3.50001 10.0001C3.50001 13.5899 6.41016 16.5001 10 16.5001C10.7496 16.5001 11.4696 16.3732 12.1396 16.1397L13.293 17.293C12.2887 17.7472 11.1739 18.0001 10 18.0001C5.58173 18.0001 2.00001 14.4183 2.00001 10.0001C2.00001 8.98725 2.29938 7.25215 3.08663 6.00003H2V4.50003H6V8.50003H4.5V6.52536C3.60487 7.93562 3.50001 9.36629 3.50001 10.0001Z"></path>
        </svg>

        <button
          className={`${btnDefault} w-16 ml-1 px-2 dark:shadow-xl`}
          onClick={(e) => handleCopy(e)}
        >
          Copy
        </button>
      </div>
      {/* box length */}
      <div className="flex justify-center items-center mx-auto">
        <label htmlFor="long">Password length</label>

        <input
          type="range"
          min="4"
          max="40"
          step="1"
          value={characterOptions.characterLength}
          onChange={handleCharacterLength}
        />
        <span>{characterOptions.characterLength}</span>
      </div>
      {/* charaters selection */}
      <div className="flex justify-center">
        <div className="my-4 mx-4">
          <label>
            <input
              type="checkbox"
              checked={characterOptions.capital}
              onChange={(e) => handleCharacterOptionChange(e, 'capital')}
            />
            ABC
          </label>
        </div>
        <div className="my-4 mx-4">
          <label>
            <input
              type="checkbox"
              checked={characterOptions.tiny}
              onChange={(e) => handleCharacterOptionChange(e, 'tiny')}
            />
            abc
          </label>
        </div>
        <div className="my-4 mx-4">
          <label>
            <input
              type="checkbox"
              checked={characterOptions.numbers}
              onChange={(e) => handleCharacterOptionChange(e, 'numbers')}
            />
            123
          </label>
        </div>
        <div className="my-4 mx-4">
          <label>
            <input
              type="checkbox"
              checked={characterOptions.signs}
              onChange={(e) => handleCharacterOptionChange(e, 'signs')}
            />
            #$&
          </label>
        </div>
      </div>
    </div>
  );
};

export default Generator;
