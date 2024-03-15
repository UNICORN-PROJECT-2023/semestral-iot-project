import ApiService from "./apiService";

export default class ArticleService {

    constructor() {
        this.apiService = new ApiService();
    }

    getAllArticles = async (categoryId) => {
        let url = '/article/all';
        if (categoryId) {
            url += `?categoryId=${categoryId}`;
        }
        const response = await this.apiService.get(url);
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            return await response.json();
        }
        throw new Error("Failed to get all articles");
    }

    getUserArticles = async () => {
        const response = await this.apiService.get('/article/me');
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        }
        throw new Error("Failed to get user articles");
    }

    getArticle = async (id) => {
        const response = await this.apiService.get(`/article/${id}`);
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        }
        throw new Error("Failed to get article");
    }

    createArticle = async (name, description, materials = [], categories = []) => {
        const response = await this.apiService.post('/article', { name, description, materials, categories});
        console.log(await response.json());
        console.log(response);
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            return;
        }
        const error = await response.json();
        throw new Error(error.message);
    }

    updateArticle = async (id, title, content, materials = [], categories = []) => {
        const response = await this.apiService.put(`/article/${id}`, { title, content, materials, categories });
        console.log(await response.json());
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            return;
        }
        throw new Error("Failed to update article");
    }

    deleteArticle = async (id) => {
        const response = await this.apiService.delete(`/article/${id}`);
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        }
        throw new Error("Failed to delete article");
    }

    getArticleList = async () => {
        const response = await this.apiService.get(`/article/list/all`)
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        } 
        throw new Error("Failed to get article list");
    }

    addArticleList = async (id) => {
        const response = await this.apiService.post(`/article/list/${id}`);
        if (response.status === 200 || response.status === 201 || response.status === 202){
            const data = await response.json();
            return data;
        }
    }

    deleteArticleList = async (id) => {
        const response = await this.apiService.delete(`/article/list/${id}`);
        if (response.status === 200 || response.status === 201 || response.status === 202){
            const data = await response.json();
            return data;
        }
    };

    getCategories = async () => {
        const response = await this.apiService.get('/category/all');
        if (response.status === 200 || response.status === 201 || response.status === 202){
            const data = await response.json();
            return data;
        }
    }
}
