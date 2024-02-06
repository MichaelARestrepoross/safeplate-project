import { useState } from 'react';
import { createUser } from '../../api/fetch';

function UserForm({createUserToggle,setCreatedUserToggle}) {
  const [userName, setUserName] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create the user data object
    const userData = {
      name: userName,
      "recipeIds": [

      ],
      "allergies": [

      ],
      "weeklyMeals": {
        "monday": {
          "breakfast": [
            ""
          ],
          "lunch": [
            ""
          ],
          "dinner": [
            ""
          ]
        },
        "tuesday": {
          "breakfast": [
            ""
          ],
          "lunch": [
            ""
          ],
          "dinner": [
            ""
          ]
        },
        "wednesday": {
          "breakfast": [
            ""
          ],
          "lunch": [
            ""
          ],
          "dinner": [
            ""
          ]
        },
        "thursday": {
          "breakfast": [
            ""
          ],
          "lunch": [
            ""
          ],
          "dinner": [
            ""
          ]
        },
        "friday": {
          "breakfast": [
            ""
          ],
          "lunch": [
            ""
          ],
          "dinner": [
            ""
          ]
        },
        "saturday": {
          "breakfast": [
            "",
          ],
          "lunch": [
            ""
          ],
          "dinner": [
            ""
          ]
        },
        "sunday": {
          "breakfast": [
            ""
          ],
          "lunch": [
            ""
          ],
          "dinner": [
            ""
          ]
        }
      }
    }

    try {
      // Use the helper function to create the user
      const createdUser = await createUser(userData);

      // Handle success, redirect or show a success message
      setCreatedUserToggle(!createUserToggle)
      console.log('User created:', createdUser);

      setUserName('');
    } catch (error) {
      // Handle error, show an error message
      console.error('Error creating user:', error);
    }
  };

  return (
      <form onSubmit={handleFormSubmit}>
        <label>
          <input type="text" placeholder='User Name:' value={userName} onChange={(e) => setUserName(e.target.value)} />
        </label>
        <button type="submit">Create User</button>
      </form>
  );
}

export default UserForm;
