export const decodeJWTFromLocalStorage = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Token JWT não encontrado');
      return null;
    }
  
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken;
    } catch (error) {
      console.error('Erro ao decodificar', error);
      return null;
    }
  }
  