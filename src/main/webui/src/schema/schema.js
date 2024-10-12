const schema = {
    firstname: {
      label: 'First Name',
      type: 'text',
      class: 'field col-12',
      validation: {
        required: 'First Name is required',
        minLength: {
          value: 3,
          message: 'First Name should have at least 3 characters',
        },
      },
    },
    lastname: {
      label: 'Last Name',
      type: 'text',
      class: 'field col-12',
      validation: {
        required: 'Last Name is required',
      },
    },
    email: {
      label: 'Email',
      type: 'email',
      class: 'field col-12',
      validation: {
        required: 'Email is required',
        pattern: {
          value: /^\S+@\S+$/i,
          message: 'Invalid email address',
        },
      },
    },
    gender: {   //static select options
        type: 'select', 
        label: 'Gender', 
        class: 'field col-12',
        validation: { 
            required: 'Gender is required' 
        }, 
        options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
        ]
    },
    country: {  //dynamic select options
        type: 'select', 
        label: 'Country', 
        class: 'field col-12',
        validation: { 
            required: 'Country is required' 
        }, 
        optionsEndpoint: '/country.json' 
    },
    subscription: { 
        type: 'radio', 
        label: 'Subscription', 
        class: 'field col-12',
        validation: { 
            required: 'Subscription is required' 
        }, 
        options: [
            { label: 'Free', value: 'free' },
            { label: 'Premium', value: 'premium' },
            { label: 'Pro', value: 'pro' },
        ]
    },
    interests: { 
        type: 'checkbox', 
        label: 'Interests', 
        class: 'field col-12',
        validation: {}, 
        options: [
            { label: 'Sports', value: 'sports' },
            { label: 'Music', value: 'music' },
            { label: 'Movies', value: 'movies' },
        ]
    },
};
  
export default schema;
