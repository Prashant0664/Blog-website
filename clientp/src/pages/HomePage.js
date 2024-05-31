import Breaker from "../components/home/breaker/Breaker";
import Card from "../components/home/card/Card";
import Posts from "../components/home/post/Posts";
import Navbar from "../components/Navbar";


function HomePage({ user }) {

  return (
    <div className="HomePage">
      <Navbar user={user} />
      <Card />
      <Breaker text='Featured Post' />
      <Posts />

    </div>
  );
}

export default HomePage;
