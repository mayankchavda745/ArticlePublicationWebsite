var express = require('express');
const { getUsers, getArticle, getAboutus, getAuthorname, getMessage, deletedata, geteditmessage } = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const data = await getUsers();
    const filteredData = data.reduce((acc, curr) => {
      const { articlename, article_id, author_id, authorname } = curr;

      if (!acc.length) {
        return [
          {
            authorId: author_id,
            authorName: authorname,
            articles: [
              {
                id: article_id,
                title: articlename
              }
            ]
          }
        ]
      } else {
        const existingAuthors = acc.map(({ authorId }) => authorId);
        const currAuthIndex = existingAuthors.indexOf(author_id);
        if (currAuthIndex === -1) {
          return [
            ...acc,
            {
              authorId: author_id,
              authorName: authorname,
              articles: [
                {
                  id: article_id,
                  title: articlename
                }
              ]
            }
          ]
        } else {
          acc[currAuthIndex].articles.push({
            id: article_id,
            title: articlename
          });
          return acc;
        }

      }
    }, [])

  //  console.log(JSON.stringify(filteredData, 2, 2));
//   const store = JSON.stringify(filteredData, 2, 2);
    //res.render('index', { data });
  //  console.log(store);
    // const ab=[1,2,3,4]
    // console.log(ab);
        res.render('index',{

         name: filteredData,
        //  list:[
        //    {
        //      items:['mango','banana','apple']
        //    },
        //    {
        //      items:['potato','tamato','avocado']
        //    }
        //  ]
        });
  } catch (error) {
    console.log(error);
  }
});

router.get('/home', async function (req, res, next) {
  try {
    const data = await getUsers();
    const filteredData = data.reduce((acc, curr) => {
      const { articlename, article_id, author_id, authorname } = curr;

      if (!acc.length) {
        return [
          {
            authorId: author_id,
            authorName: authorname,
            articles: [
              {
                id: article_id,
                title: articlename
              }
            ]
          }
        ]
      } else {
        const existingAuthors = acc.map(({ authorId }) => authorId);
        const currAuthIndex = existingAuthors.indexOf(author_id);
        if (currAuthIndex === -1) {
          return [
            ...acc,
            {
              authorId: author_id,
              authorName: authorname,
              articles: [
                {
                  id: article_id,
                  title: articlename
                }
              ]
            }
          ]
        } else {
          acc[currAuthIndex].articles.push({
            id: article_id,
            title: articlename
          });
          return acc;
        }

      }
    }, [])
      res.render('index',{name: filteredData});
  } catch (error) {
    console.log(error);
  }
});



router.get('/aboutus', async function (req, res, next) {
  try {
    const data = await getAboutus();
    res.render('aboutus', { data });
  } catch (error) {
    console.log(error);
  }
});

router.get('/article/:id', async function (req, res, next) {
  try {
    const data = await getArticle(req)
    //  console.log(data);
    res.render('article', { data })
  } catch (error) {
    console.log(error);
  }
});

router.get('/usermessage/:id', async function (req, res, next) {
  const data1 = await deletedata(req);
  const data = await getMessage();
  res.render('usermessage', { data })
});

router.get('/admin', async function (req, res, next) {
  try {
    const data = await getAuthorname();
    //   console.log(data)
    res.render('admin', { data });

  } catch (error) {
    console.log(error);
  }
});

router.get('/contactus', function (req, res, next) {
  res.render('contactus');
});

router.get('/contactus/:id', async function (req, res, next) {
  console.log(req.params.id);
  const { id } = req.params.id;
  const data = await geteditmessage(req);
  console.log(data);
  res.render('edit', { data,id });
});

router.get('/usermessage', async function (req, res, next) {
  try {
    const data = await getMessage();
    res.render('usermessage', { data });
  } catch (error) {
    console.log(error);
  }
});





module.exports = router;
