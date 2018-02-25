import React from 'react';
import { Redirect } from 'react-router';
import { shape, number, array, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import StarsRating from '../StarsRating';
import BottleSvg from '../../svg-components/Bottle';
import ItemDetail from '../ItemDetail';
import Nav from '../Nav';
import './style.scss';
import Picture from '../Picture';
import {Helmet} from "react-helmet";

const ItemShow = ({ match, items, history }) => {
  const item = items[match.params.id - 1];

  if (!item) {
    return <Redirect to="/browse" />;
  }

  return (
      <article className="ItemShow">
        <Helmet
          htmlAttributes={{ lang: 'en', amp: undefined }}
          title={item.name}
          titleTemplate="Vivino.pl - %s"
          meta={[
            { name: 'description', content: item.grapes },
            { property: 'fb:app_id', content: '' },
            { property: 'og:url', content: window.location.href },
            { property: 'og:title', content: item.title },
            { property: 'og:type', content: 'article' },
            { property: 'og:description', content: item.grapes },
            { property: 'og:image', content: item.image_url },
            { property: 'og:image:width', content: '694' },
            { property: 'og:image:height', content: '390' },
          ]}
        />
        <Nav back title={item.name} annotation={`${item.color}, ${item.region}, ${item.country}`} />

        <div className="ItemShow__inner">
          <img
            alt="country flag"
            className="ItemShow__country-outlines"
            src={`/images/country-outlines/${item.country_code}.svg`}
          />
          <div className="ItemShow__content">
            <div className="ItemShow__stats">
              <div className="ItemShow__rating">{item.rating}</div>
              <p>{item.nr_of_ratings} ratings</p>
              <StarsRating className="ItemShow__stars" maxRating={5} rating={item.rating} />
            </div>

            <div className="ItemShow__image-wrapper">
              {item.image_url ? (
                <Picture className="ItemShow__image" src={item.image_url} alt="wine" />
              ) : (
                <BottleSvg className="ItemShow__image" />
              )}
            </div>
          </div>
        </div>

        <ItemDetail item={item} />
      </article>
  );
};

ItemShow.propTypes = {
  match: shape({
    'params.id': number,
  }),
  history: object,
  items: array,
};

export default withRouter(ItemShow);
