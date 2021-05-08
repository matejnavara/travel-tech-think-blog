---
title: 100DaysOfCode Pt.4
author: Tech
date: 2021-05-19
excerpt: More 100 Days Of Code challenge. Data data data!
hero: ./images/cover.jpg
---

---

## 🄳🄸🅂🄲🄻🄰🄸🄼🄴🅁

This is not a structured blog post but a raw ongoing log of progress during the 100DaysOfCode challenge.

It is long. It isn't proof read or spellchecked. There will be bugs and typos.

Don't judge. You have been warned. Now go forth;
k
![Uncut/Unedited](https://media.giphy.com/media/xTiTnu831s1um2X9ug/giphy.gif)

---

# **#100DaysOfCode Part 4** _(Day 61-80)_

## Day 61 - 30/04/2021

Start of part 4/5 is making this awfully real! The time is ticking and I want this app "done" by the end.

We will define what this definition of DONE means but it should be a functional MVP that is shareable.

As for this day I will do a little bit of housekeeping on the app front, noticed some oversights after returning from backend-land.

1. Redux actions not used consistently.

2. API is missing some App routes and controller/service structure

3. Categories are still pulling from constants.

Will hit the first now, second tomorrow and third day after. Busy days are limiting the time sadly.

Simple changes:
![Redux actions used](./images/day61-redux-actions-fix.png)

---

## Day 62 - 01/05/2021

Now the 2nd day of housekeeping on May Day.

Back in API land adding the necessary App routes for Categories we'll need for fix numero 3. Also restructuring to match the controller/services of the Admin App.

![API refactor noice](./images/day62-api-refactor.png)

A much neater route.

---

## Day 63 - 02/05/2021

Calling the Categories from the API. These won't change often so perhaps just an initial call on load to update the store with some basic fallback to begin with for now.

Today adding the necessary Redux store/reducer/actions for Category fetching.

### REDUCER:

```ts
import { CategoryActionTypes } from "../ActionTypes";
import { CategoryProps } from "../../Interfaces";
import CATEGORIES from "../../Constants/Categories";

const INITIAL_STATE = {
  categories: CATEGORIES,
  loadingCategories: false
};

const categoriesReducer = (
  state = INITIAL_STATE,
  action: { type: any; payload?: CategoryProps[] }
) => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORIES_REQUEST:
      return { ...state, loadingCategories: true };
    case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, loadingCategories: false };
    case CategoryActionTypes.FETCH_CATEGORIES_FAILURE:
      return { ...state, loadingCategories: false };
    default:
      return state;
  }
};

export default categoriesReducer;
```

### ACTIONS:

```ts
import { AppDispatch } from "../store";
import { CategoryActionTypes } from "../ActionTypes";
import { CategoryProps } from "../../Interfaces";
import { getAPICategories } from "../../api";

const fetchCategories = () => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_REQUEST
});

const fetchCategoriesSuccess = (categories: CategoryProps[]) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: categories
});

const fetchCategoriesFailure = () => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE
});

export const getCategoriesAsync = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchCategories());
    try {
      const { data } = await getAPICategories();
      dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
      console.log("🚀 ~ getCategoriesAsync error", error);
      dispatch(fetchCategoriesFailure());
    }
  };
};
```

For now just call on app load:

```jsx
export default function App() {
  const dispatch = useDispatch();
  const { notification, scheduleNotification } = useNotification();

  useEffect(() => {
    dispatch(getCategoriesAsync);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Motivications" component={AlarmScreen} />
          <Tab.Screen name="Saved Quotes" component={QuoteScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
```

---

## Day 64 - 03/05/2021

One issue with calling the Categories from the API is that the category images are currently only stored locally.

We could move these to an external location such as an S3 bucket and store the image path on the DB but I wish to keep it locally for now so to assign images to Categories I create the simple helper below.

---

## Day 65 - 04/05/2021

May the Fourth be with you.

---

## Day 66 - 05/05/2021

Revenge of the fifth

---

## Day 67 - 06/05/2021

---

## Day 68 - 07/05/2021

---

## Day 69 - 08/05/2021

---
