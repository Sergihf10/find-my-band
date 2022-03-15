import React, { useState } from 'react';
import { useContext } from 'react';
import { formContext } from '../Create_Acc_Parent/ParentForm';
import { useEffect } from 'react';
import './FormWorkWithGenres.css';
import { formContextInterface } from '../Create_Acc_Parent/ParentForm';

const FormWorkWith: React.FC = () => {
  const context = useContext(formContext) as formContextInterface;
  const [tempArr, setTempArr] = useState<string[]>([]);
  const genres = [
    'Hip-Hop',
    'Pop',
    'RnB',
    'Blues',
    'Soul',
    'Jazz',
    'Funk',
    'Rock',
    'Punk',
    'House',
    'Metal',
    'Experimental',
  ];

  useEffect(() => {
    console.log('tempArr updated');
    console.log(tempArr, '<< tempArr BandRoles');
  }, [tempArr]);

  function toggleElement(item: string) {
    setTempArr((prevArr) => {
      let arrCopy = [...prevArr];
      if (arrCopy.includes(item)) {
        arrCopy = arrCopy.filter((val) => {
          return val !== item;
        });
      } else {
        arrCopy.push(item);
      }
      return arrCopy;
    });
  }

  function goPrevPage() {
    context.setPage((page) => page - 1);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      //Update context
      context.setUserObj({ ...context.userObj, workWithGenres: tempArr });
      //Go to next page
      context.setPage((page) => page + 1);
    } catch (err) {
      console.log(' : : : error submitting User Desired Genres : : : ', err);
    }
  }

  return (
    <div className="genres-form-container">
      <form className="form basicform" onSubmit={handleSubmit}>
        <h3 className="top-text">And what genres do they make ?</h3>
        <h4 className="sub-top">Pick as many as you like</h4>
        <div className="genres-container">
          {genres.map((item) => {
            let isSelected = tempArr.includes(item); //returns true if tempArr includes item
            return (
              <div
                key={item}
                className={`${isSelected && 'usr-selected'}  usr-select4`}
                onClick={() => {
                  toggleElement(item);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className="buttons">
          <button className="back-btn" onClick={goPrevPage}>
            Prev
          </button>
          <button className="next-btn" type="submit">
            Next Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormWorkWith;
