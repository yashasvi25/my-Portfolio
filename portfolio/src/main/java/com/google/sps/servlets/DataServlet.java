package com.google.sps.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/data")
public class DataServlet extends HttpServlet { 

  private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);

    PreparedQuery results = datastore.prepare(query);

    List<Comment> comments = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String commentInput = (String) entity.getProperty("commentInput");
      long timestamp = (long) entity.getProperty("timestamp");
      String email = (String) entity.getProperty("email");

      Comment comment = new Comment(id, commentInput, timestamp, email);
      comments.add(comment);
    }
    
    Gson gson = new Gson();

    response.setContentType("application/json");
    response.getWriter().println(gson.toJson(comments));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String commentInput = getParameter(request, "comment-input", "");
    long timestamp = System.currentTimeMillis();

    
    UserService userService = UserServiceFactory.getUserService();
    String userEmail = userService.getCurrentUser().getEmail();

    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("commentInput", commentInput);
    commentEntity.setProperty("timestamp", timestamp);
    commentEntity.setProperty("email", userEmail);

    datastore.put(commentEntity);

    response.sendRedirect("/#comment");
  }

  private String getParameter(HttpServletRequest request, String stringInput, String defaultValue) {
    String value = request.getParameter(stringInput);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }


}
