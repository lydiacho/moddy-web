import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

import { IcCheckboxGrey, IcCheckboxBlue } from '../views/@common/assets/icons';
import Button from '../views/@common/components/Button';
import Header from '../views/@common/components/Header';
import DirectionModal from '../views/OfferInfoPage/components/DirectionModal';

import DesignerInfoSection from '@/views/OfferInfoPage/components/DesignerInfoSection';
import OfferDetailSection from '@/views/OfferInfoPage/components/OfferDetailSection';
import { OFFER_INFO_TEXT } from '@/views/OfferInfoPage/constants/message';
import useGetOfferModel from '@/views/OfferInfoPage/hooks/useGetOfferModel';

const OfferInfoPage = () => {
  const { state } = useLocation();
  const offerId = state.applicationId;
  const { data } = useGetOfferModel(offerId);

  // 체크 표시 클릭시 CTA 버튼 활성화
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckBoxClick = () => {
    setIsChecked((prev) => !prev);
  };

  //모달창 열림
  const [isModal, setIsModal] = useState(false);
  const handleModalOpen = () => {
    setIsModal(true);
  };

  return (
    data && (
      <>
        <DirectionModal
          isModal={isModal}
          onClose={() => setIsModal(false)}
          offerId={offerId}
          applicationId={data.applicationInfo.applicationId}
          designerId={data.designerInfo.designerId}
        />
        <Header title="도착한 제안서" isBackBtnExist={true} />
        <S.OfferInfoLayout>
          <DesignerInfoSection designerInfo={data.designerInfo} />
          <S.DivisionLine />
          <OfferDetailSection data={data} />
          <S.AgreementBox>
            <S.CheckboxBtn onClick={handleCheckBoxClick}>
              {isChecked ? <IcCheckboxBlue /> : <IcCheckboxGrey />}
            </S.CheckboxBtn>
            {OFFER_INFO_TEXT.AGREE_TO_ASSIGNMENT}
          </S.AgreementBox>
        </S.OfferInfoLayout>
        <Button text="수락하기" isFixed={false} onClickFn={handleModalOpen} disabled={!isChecked} />
      </>
    )
  );
};

const S = {
  OfferInfoLayout: styled.section`
    position: relative;

    width: 100%;
    margin-top: 5.7rem;
  `,

  DivisionLine: styled.div`
    width: 100%;
    height: 0.8rem;
    margin-bottom: 3.03rem;

    background-color: ${({ theme }) => theme.colors.moddy_gray05};
  `,

  CheckboxBtn: styled.button`
    margin-right: 1.1rem;
  `,

  AgreementBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    margin: 2.4rem 0;

    color: ${({ theme }) => theme.colors.moddy_bk};
    ${({ theme }) => theme.fonts.Body01};
  `,
};
export default OfferInfoPage;
