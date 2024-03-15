import {useEffect, useRef, useState} from 'react';
import ProfilePage from '../pages/ProfilePage';
import UserService from '../services/userService';
import ArticleService from '../services/ArticleService';

function ProfileScreen() {
  const userService = new UserService();
  const articleService = new ArticleService();
  const [loading, setLoading] = useState(false);
  const [userArticles, setUserArticles] = useState([]);
  const [ArticleList, setArticleList] = useState([]);
  const [error, setError] = useState(null);
  const [userEdit, setUserEdit] = useState(false);
  const [type, setType] = useState("password");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [categories, setCategories] = useState([]);
  const [updateCategories, setUpdateCategories] = useState([]);

  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
  });

  async function getUser() {
    setLoading(true);
    const user = await userService.getCurrentUser();
    setUser({
      id: user.body.id,
      username: user.body.username,
      email: user.body.email,
    });
    setLoading(false);
  }

  useEffect(() => {
    getUser();
    fetchUserArticles();
    fetchArticleList();
    fetchCategories();
  }, []);

  async function fetchUserArticles() {
    try {
      const userArticles = await articleService.getUserArticles();
      setUserArticles(userArticles.body);
      console.log(userArticles)
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchArticleList() {
    try {
      const userArticleList = await articleService.getArticleList();
      setArticleList(userArticleList.body);
      console.log(userArticleList);
    } catch (error) {
      console.log(error);
    }
  }
 
  async function fetchCategories() {
    try {
      const categories = await articleService.getCategories();
      const updatedCategories = await articleService.getCategories();
      setCategories(categories.body);
      setUpdateCategories(updatedCategories.body);
    } catch (error) {
      console.error(error);
    }
  }

  function getArticleIdFromUrl(url) {
    const regex = /[?&]v=([^&]+)/;
    if (url && typeof url === 'string') {
      const match = url.match(regex);
      return match ? match[1] : null;
    }
    return null;
  }

  const nameRef = useRef();
  const episodeRef = useRef();
  const descriptionRef = useRef();
  const originalLinkRef = useRef();
  const materialsRef = useRef();

  const editNameRef = useRef();
  const editEpisodeRef = useRef();
  const editDescriptionRef = useRef();
  const editOriginalLinkRef = useRef();
  const editMaterialsRef = useRef();

  async function createArticle() {
    try {
      await articleService.createArticle(
        nameRef.current.value,
        descriptionRef.current.value,
        [materialsRef.current.value],
        categories
            .filter((category) => category.isSelected)
            .map((category) => ({name: category.name})
        )
      );
      await fetchUserArticles()
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      episodeRef.current.value = "";
      originalLinkRef.current.value = "";
      materialsRef.current.value = "";
    } catch (error) {
      setError(error)
    }
  }

  async function updateArticle(ArticleId) {
    try {
      await articleService.updateArticle(
        ArticleId,
        editNameRef.current.value,
        editDescriptionRef.current.value,
        Number(editEpisodeRef.current.value),
        editOriginalLinkRef.current.value,
        [editMaterialsRef.current.value],
        updateCategories
        .filter((category) => category.isSelected)
        .map((category) => ({name: category.name})
    )
      );
      await fetchUserArticles();
      onCancelClick();
    } catch (error) {
      console.log(error);
    }
  }

  function editMode(id) {
    setUpdateCategories((categories) => {
        return categories.map((category) => {
            category.isSelected = false;
            return category;
        });
    })

    setUserArticles((userArticles) => 
      userArticles.map((Article) => {
        if (Article.id === id) {
          Article.editMode = true;
          console.log(Article);
          Article.categories.forEach((category) => {
            OnCategoryUpdateClick(category.name);
            console.log(category.name)
          })
          return Article;
        }
        Article.editMode = false;
        return Article;
      })
    );
  }

  function onCancelClick() {
    setUserArticles((userArticles) => 
      userArticles.map((Article) => {
        Article.editMode = false;
        return Article;
      })
    );
  }

  const editUserNameRef = useRef();
  const editUserEmailRef = useRef();
  const editUserPasswordRef = useRef();

  async function editProfile() {
    try {
      await userService.editUser(
        editUserNameRef.current.value,
        editUserEmailRef.current.value,
        editUserPasswordRef.current.value
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  function userEditMode () {
    setUserEdit(true);
  }

  function onCancelUserClick() {
    setUserEdit(false);
  } 

  function showPassword() {
    if (type === "password") {
      setType("text");
      setPasswordVisible(true);
    } else {
      setType("password");
      setPasswordVisible(false);
    }
  }

  async function deleteArticle(ArticleId) {
    try {
      const response = await articleService.deleteArticle(ArticleId);
      console.log(response);
      await fetchUserArticles();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteArticleFromList(ArticleId) {
    try {
      const response = await articleService.deleteArticleList(ArticleId);
      console.log(response);
      await fetchArticleList();
    } catch (error) {
      console.log(error);
    }
  }

  async function onCategoryClick(name) {
    setCategories((createCategories) => {
      // remove category from array
      if(createCategories.find((category) => category.name === name && category.isSelected === true)) {
        return createCategories.map((category) => {
          if (category.name === name) {
            category.isSelected = false;
            return category
          }
          return category
        })
      }
      // add category to array
      if(createCategories.filter((category) => category.isSelected === true).length < 3) {
        return createCategories.map((category) => {
          if (category.name === name) {
            category.isSelected = true;
            return category
          }
          return category
        })
      }

      return createCategories;
    });
  }

  function OnCategoryUpdateClick(name) {
    setUpdateCategories((updateCategories) => {
      // remove category from array
      if(updateCategories.find((category) => category.name === name && category.isSelected === true)) {
        return updateCategories.map((category) => {
          if (category.name === name) {
            category.isSelected = false;
            return category
          }
          return category
        })
      }
      // add category to array
      if(updateCategories.filter((category) => category.isSelected === true).length < 3) {
        return updateCategories.map((category) => {
          if (category.name === name) {
            category.isSelected = true;
            return category
          }
          return category
        })
      }

      return updateCategories;
    });
  }

  return (
    <ProfilePage
      loading={loading}
      username={user.username}
      email={user.email}
      error={error}
      getArticleIdFromUrl={getArticleIdFromUrl}
      dataForUserArticles={userArticles}
      dataForUpdatedCategories = {updateCategories}
      dataForCategories = {categories}
      dataForArticleList={ArticleList}

      nameRef={nameRef}
      descriptionRef={descriptionRef}
      episodeRef={episodeRef}
      urlRef={originalLinkRef}
      materialsRef={materialsRef}

      editUserNameRef={editUserNameRef}
      editUserEmailRef={editUserEmailRef}
      editUserPasswordRef={editUserPasswordRef}
      type = {type}
      showPassword = {showPassword}
      passwordVisible = {passwordVisible}
      editUser = {editProfile}
      userEdit = {userEdit}
      userEditMode = {userEditMode}
      onCancelUserClick = {onCancelUserClick}

      editNameRef={editNameRef}
      editDescriptionRef={editDescriptionRef}
      editEpisodeRef={editEpisodeRef}
      editUrlRef={editOriginalLinkRef}
      editMaterialsRef={editMaterialsRef}

      updateArticle={updateArticle}
      editModeTrue={editMode}
      onCancelClick={onCancelClick}
      onCreateClick={createArticle}
      onEditClick={updateArticle}

      onDeleteClick={deleteArticle}
      onDeleteFromList={deleteArticleFromList}

      onCategoryUpdateClick={OnCategoryUpdateClick}
      onCategoryClick={onCategoryClick}
    />
  );
}
export default ProfileScreen;
