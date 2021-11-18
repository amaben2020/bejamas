import React from 'react';
import styles from './../../styles/descriptionLayout.module.scss';
import { Col, Row } from 'react-bootstrap';
interface IDescription {
  text: any[];
  title: any[];
  category: any[];
  recommendations: any;
}

const Description = ({
  text,
  category,
  title,
  recommendations,
}: IDescription) => {
  const recSize = Object.values(recommendations)
    .map((r: any) => r.image.size)
    .filter((size) => size > 50);
  const recSize2 = Object.values(recommendations)
    .map((r: any) => r.image.size)
    .filter((size) => size < 25);

  return (
    <div className={styles.description__layout}>
      <Row>
        <Col
          lg={7}
          md={7}
          sm={7}
          className={styles.description__layout__textarea}
        >
          <h2 className={styles.description__layout__textarea__headingLarge}>
            About the {title}
          </h2>
          <h4 className={styles.description__layout__textarea__headingSmall}>
            {category}
          </h4>
          <p className={styles.description__layout__text}> {text} </p>
        </Col>

        <Col
          lg={5}
          md={5}
          sm={5}
          xs={12}
          className={styles.description__layout__details}
        >
          <h4 className={styles.description__layout__details__heading}>
            People also buy
          </h4>
          <div className={styles.description__layout__details__imageWrapper}>
            {recommendations?.map(
              (recommendation: {
                name:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                image: any;
              }) => (
                <img
                  className={
                    styles.description__layout__details__imageWrapper__img
                  }
                  src={recommendation.image.url}
                  alt={recommendation.image.name}
                />
              )
            )}{' '}
          </div>
          <div className={styles.description__layout__details__textWrapper}>
            <h3
              className={
                styles.description__layout__details__textWrapper__heading
              }
            >
              Details
            </h3>
            <p
              className={styles.description__layout__details__textWrapper__body}
            >
              size: {recSize} * {recSize} pixel
            </p>
            <p
              className={styles.description__layout__details__textWrapper__body}
            >
              size: {recSize2}mb
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Description;
