using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testEvolution.Data;
using testEvolution.Helpers;
using testEvolution.Interfaces;
using testEvolution.Models.Entities;
using testEvolution.Models.Enums;

namespace testEvolution.Services
{
    public class UserService : BaseData, IData<User>
    {
        public User Add(User user)
        {
            if(user == null) return null;
            //INSERT INTO users OUTPUT INSERTED.* VALUES ('aaaa', 'asdsdad', 1)
            sqlCommand.CommandText = "INSERT INTO users VALUES(@user_name, @password, @state)";
            sqlCommand.Parameters.AddWithValue("@user_name", user.Username);
            sqlCommand.Parameters.AddWithValue("@password", user.Password);// new PasswordHasher().HashPassword(model.Password));
            sqlCommand.Parameters.AddWithValue("@state", State.ACTIVO);
            try{
                Connection.Open();
                int result  = sqlCommand.ExecuteNonQuery();
                if (result > 0 ){ user.Id = GetInsert();}
                return user;
            }catch(Exception e){
                Console.WriteLine(e.Message);
                Connection.Close();
                return null;
            }
        }

        public int GetInsert(){
            sqlCommand.CommandText = "SELECT MAX(id) as id FROM users";
            reader = sqlCommand.ExecuteReader();
            int id = 0;
            while (reader.Read())
            {
                id = Convert.ToInt32(reader["id"]);
            }
            return id;
        }

        public User Edit(int id, User user)
        {
            if(user == null) return null;
            //INSERT INTO users OUTPUT INSERTED.* VALUES ('aaaa', 'asdsdad', 1)
            sqlCommand.CommandText = $"UPDATE users SET user_name = @user_name, password = @password, state = @state WHERE id = {id}";
            sqlCommand.Parameters.AddWithValue("@user_name", user.Username);
            sqlCommand.Parameters.AddWithValue("@password", user.Password);// new PasswordHasher().HashPassword(model.Password));
            sqlCommand.Parameters.AddWithValue("@state", user.State);
            try{
                Connection.Open();
                int result  = sqlCommand.ExecuteNonQuery();
                return result > 0?user:null;
            }catch(Exception e){
                Console.WriteLine(e.Message);
                Connection.Close();
                return null;
            }
        }

        public User Find(User model)
        {
            sqlCommand.CommandText = $"SELECT * FROM users where [user]='{model.Username}' AND [password]='{model.Password}' AND [state] = {Convert.ToInt32(State.ACTIVO)}";
            Connection.Open();
            reader = sqlCommand.ExecuteReader();
            User user = reader.Read()? new User(reader): null;
            Connection.Close();
            return user;
        }
        public User Find(object id)
        {
            sqlCommand.CommandText = $"SELECT * FROM users where id={id}";
            try
            {
                Connection.Open();
                reader = sqlCommand.ExecuteReader();
                User user = reader.Read()? new User(reader): null;
                Connection.Close();
                return user;
            }
            catch (Exception e)
            {
                Connection.Close();
                return null;
            }
        }

        public IList<User> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
