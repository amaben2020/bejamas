import React from 'react';
import styles from './../../styles/descriptionLayout.module.scss';
import { Col, Row } from 'react-bootstrap';
import { IProduct, IRecommendation } from '../../interface/products';
import Image from 'next/image';
interface IDescription {
  featuredText: string[];
  featuredTitle: string[];
  featuredCategory: string[];
  recommendations: IProduct[];
}

const Description = ({
  featuredText,
  featuredCategory,
  featuredTitle,
  recommendations,
}: IDescription) => {
  const recSize = Object.values(recommendations)
    //@ts-ignore
    .map((r: IProduct) => r.image.size)
    .filter((size) => size > 50);
  const recSize2 = Object.values(recommendations)
    //@ts-ignore
    .map((r: IProduct) => r.image.size)
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
            About the {featuredTitle}
          </h2>
          <h4 className={styles.description__layout__textarea__headingSmall}>
            {featuredCategory}
          </h4>
          <p className={styles.description__layout__text}> {featuredText} </p>
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
            {recommendations?.map((recommendation: IProduct) => (
              <div
                //@ts-ignore
                key={recommendation.image.url}
                className={
                  styles.description__layout__details__imageWrapper__img
                }
              >
                <Image
                  width="160"
                  height="250"
                  //@ts-ignore
                  src={recommendation.image.url}
                  //@ts-ignore
                  alt={recommendation.image.name}
                />
              </div>
            ))}
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
