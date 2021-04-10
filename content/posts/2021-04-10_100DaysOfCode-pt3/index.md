---
title: 100DaysOfCode Pt.3
author: Tech
date: 2021-04-10
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

# **#100DaysOfCode Part 3** _(Day 41-60)_

## Day 41 - 10/04/2021

New day and start of chapter 3 of the 5 part blog documentation. I realise it's quite an unstructured mess so each one come with a disclaimer...

Anyway now after getting the whole `DB -> API -> App` flow working I will build out a few more endpoints. One big one is the core motivication endpoint which gets a random quote of the chosen category. This will be the basis of the motivication notification:

```js
router.get("/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const { rows } = await db.query(
    `SELECT ${selectFullQuote("q", "a")}
      FROM category_quotes AS cq
      JOIN quotes AS q ON q.id = cq."quoteId"
      JOIN authors AS a ON a.id = q.author
      WHERE "categoryId" = ${categoryId}
      ORDER BY random()
      LIMIT 1`
  );
  res.status(200).json(rows[0]);
});
```

Next will be `/admin` endpoints in preperation for the Admin app that I want to start shortly, this will make interacting with the data and adding/updating information so much easier.

For this we will need CRUD endpoints for most of the models which won't be used by the app but will be needed for the admin app.

Below are basic CRUD routes for Authors.

```js
/* Admin Author Routes. */
router
  .route("/authors")
  .get(async (req, res) => {
    const { rows } = await db.query(`SELECT * FROM authors`);
    res.status(200).json(rows);
  })
  .post(async (req, res) => {
    const { author } = req.params;
    await db.query(
      `INSERT INTO authors(name,description,when)
        VALUES (${author.name}, ${author.description}, ${author.when})`
    );
  });

router
  .route("/authors/:authorId")
  .get(async (req, res) => {
    const { authorId } = req.params;
    const { rows } = await db.query(
      `SELECT * FROM authors
        WHERE id = ${authorId}`
    );
    res.status(200).json(rows[0]);
  })
  .put(async (req, res) => {
    const { authorId, author } = req.params;
    await db.query(
      `UPDATE authors
        SET name = ${author.name}, description = ${author.description}, when = ${author.when}
        WHERE id = ${authorId}`
    );
    res.status(200);
  })
  .delete(async (req, res) => {
    const { authorId } = req.params;
    await db.query(`DELETE FROM authors WHERE id = ${authorId}`);
    res.status(200);
  });
```

Quotes looks very much the same except I played around with including author as json and aggregating the categories (since one quote can have many categories):

```sql
SELECT q.id, q.quote, json_agg(c) AS categories, row_to_json(a) AS author
  FROM quotes AS q
  JOIN category_quotes AS cq on q.id = cq."quoteId"
  JOIN categories AS c on cq."categoryId" = c.id
  JOIN authors AS a on q.author = a.id
  GROUP BY q.id, a.id
```

Still all very messy but progress is progress.

---
