import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const product = {
    id: 2,
    brand: "L'Oreal",
    name: "L' Oreal Paris Voluminous Mascara",
    description:
      "Voluminous - Volume Building Waterproof Mascara’s unique waterproof formula builds lashes to four times their natural thickness. Patented Volume-Maximizing Brush™ thickens lashes evenly and smoothly, leaving them soft with virtually no flakes, smudges, or clumps.Uniquely formulated to resist clumping, soften lashes, and build lashes to four times their natural thickness, with waterproof wear. Patented Volume Maximizing Brush™ thickens lashes evenly and smoothly, leaving them soft with virtually no flakes, smudges, or clumps.Ophthalmologist-tested and allergy-tested.Suitable for sensitive eyes and contact lens wearers.Clump-resistant.Fragrance-free.All-day wear.Ingredients:ISODODECANE • AQUA / WATER / EAU • CERA ALBA / BEESWAX / CIRE D'ABEILLE • DISTEARDIMONIUM HECTORITE • CARNAUBA / CARNAUBA WAX / CIRE DE CARNAUBA • PARAFFIN • ALCOHOL DENAT • ALLYL STEARATE/VA COPOLYMER • VA/VINYL BUTYL BENZOATE/CROTONATES COPOLYMER • PROP",
    product_type: 'mascara',
    api_featured_image:
      '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/002/original/data?1514061106',
    price_sign: null,
    product_colors: [
      { hex_value: '#231F20', colour_name: 'Black ' },
      { hex_value: '#4D2C00', colour_name: 'Black Brown ' },
      { hex_value: '#030000', colour_name: 'Carbon Black ' },
    ],
    price: '15',
  };

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/product/2')
      .expect(200)
      .expect(product);
  });
});
