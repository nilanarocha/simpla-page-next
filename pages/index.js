import styles from '../styles/Home.module.css';
import Head from 'next/head';

import { Component, Fragment } from 'react';

class Home extends Component {
  state = {
    title: '',
    image: '',
    article: '',
  };
  async componentDidMount() {
    try {
      const response = await this.callBackendAPI();
      this.setState({ ...response });
    } catch (error) {
      console.log(error);
    }
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/article');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    const { title, image, article } = this.state;
    return (
      <Fragment>
        <div className={styles.container}>
          <Head>
            <title>Simple Page</title>
            <link rel="icon" href="/cat.ico" />
          </Head>
          <article>
            <h1>{title || 'title not found'}</h1>
            {image ? (
              <img src={image} alt="cat" />
            ) : (
              <img
                src="https://www.macedonrangeshalls.com.au/wp-content/uploads/2017/10/image-not-found.png"
                alt="cat"
              />
            )}
            {article && <p>{article}</p>}
          </article>
          <footer className="footer">
            <p className="p">© All Rights Reserved by Nilana Rocha2020</p>
          </footer>
        </div>
      </Fragment>
    );
  }
}

export default Home;
