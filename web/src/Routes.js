import { Router, Route, Set } from '@redwoodjs/router'
import Loader from './components/Loader/Loader'
import Sidebar from './components/Sidebar/Sidebar'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>



      <Route path="/mailto" page={MailtoPage} name="mailto" />



      <Set wrap={MainLayout}>
        <Route path="/channel/{id}" page={ChannelPage} name="channel" />
        <Route path="/" page={HomePage} name="home" whileLoadingPage={Loader} />
        <Route path="/login" page={LoginPage} name="login" whileLoadingPage={Loader} />
        <Route path="/signup" page={SignupPage} name="signup" whileLoadingPage={Loader} />
        <Route path="/community" page={CommunityPage} name="community" whileLoadingPage={Loader} />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" whileLoadingPage={Loader} />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" whileLoadingPage={Loader} />
        <Route path="/tag/{id}" page={TagsPage} name="tags" whileLoadingPage={Loader} />
        <Route path="/search" page={SearchPage} name="search" whileLoadingPage={Loader} />
        <Route path="/categories" page={CategoriesPage} name="categories" whileLoadingPage={Loader} />
        <Set private unauthenticated="login">
          <Route path="/upload" page={UploadPage} name="upload" whileLoadingPage={Loader} />
          <Route path="/profile" page={ProfilePage} name="profile" whileLoadingPage={Loader} />
          <Route path="/studio" page={StudioPage} name="studio" whileLoadingPage={Loader} />
          <Route path="/edit/{id}" page={EditPage} name="edit" whileLoadingPage={Loader} />
          <Set wrap={Sidebar} roles={["admin"]}>
          <Route path="/admin" page={AdminPage} name="admin" whileLoadingPage={Loader} />
          <Route path="/admin/users" page={UsersPage} name="users" whileLoadingPage={Loader} />
          <Route path="/admin/videos" page={AdminVideosPage} name="adminVideos" whileLoadingPage={Loader} />
          </Set>
        </Set>
        <Route path="/explore" page={ExplorePage} name="explore" whileLoadingPage={Loader} />
        <Route path="/watch/{id}" page={WatchPage} name="watch" whileLoadingPage={Loader} />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
