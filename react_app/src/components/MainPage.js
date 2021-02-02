import React from "react";
import ContentContainer from "./ContentContainer";
import {useTranslation} from 'react-i18next';

const MainPage = () => {
  const {t} = useTranslation();

  return (
      <ContentContainer contentTitle={t("pageTitles.mainPage")}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          error harum, et ipsum cumque consequuntur
          debitis inventore quis similique fuga exercitationem quaerat rerum
          magnam mollitia quo labore asperiores. Tenetur
          nemo repellendus soluta, doloremque obcaecati officiis dolor ipsam? A,
          fugit! Non quibusdam maxime, ullam officia
          eum incidunt! Ut, atque aspernatur vel quos laborum neque accusamus
          quod debitis consectetur cumque nesciunt
          officia enim quaerat. Quibusdam ipsa quaerat repellat facere eveniet,
          eos ratione nisi error aut molestias
          eligendi cum officiis. Ex reiciendis obcaecati quaerat voluptates
          dolore earum temporibus asperiores, officiis
          fugiat, eum explicabo. Maxime quasi minima laudantium, laborum
          voluptatibus, vitae dolores quos non unde ea libero
          odio possimus maiores? Unde quibusdam officiis eos quisquam aperiam
          rerum, natus est saepe debitis animi, dolore
          repudiandae quia consequuntur pariatur doloremque temporibus libero
          obcaecati blanditiis. Ut odit aliquam
          voluptatem aperiam ea porro consectetur vero hic accusantium ipsam
          magni aut, quae provident minus quia voluptas
          nobis doloribus at repellendus iusto laboriosam vel! Ipsam fugit,
          recusandae corporis eligendi, sunt aspernatur
          quae vero architecto nam ea veniam maxime excepturi explicabo labore
          aperiam suscipit assumenda rem incidunt?
          Assumenda omnis dicta numquam, delectus at ipsum asperiores provident
          deserunt, unde nostrum debitis excepturi
          blanditiis aliquid officia beatae? Cumque autem totam sint, repellat
          eligendi fuga. Nihil et quasi explicabo hic
          molestias sapiente! Quisquam itaque et eveniet laborum velit aperiam
          at nulla architecto maxime, ipsam saepe
          officia recusandae sunt libero placeat quo eius, aliquid
          accusantium?</p>
      </ContentContainer>
  )
}

export default MainPage;