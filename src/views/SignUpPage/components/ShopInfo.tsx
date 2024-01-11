import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { days } from '../constants/days';
import { HELPER_MESSAGE } from '../constants/message';
import { TOTAL_STEP } from '../constants/step';
import { EnterProfileProp } from '../utils/enterProfileProp';

import Field from './Field';

import Button from '@/views/@common/components/Button';
import Input from '@/views/@common/components/Input';
import Modal from '@/views/@common/components/Modal';
import ProgressBar from '@/views/@common/components/ProgressBar';

const ShopInfo = ({ setStep }: EnterProfileProp) => {
  //이동
  const navigate = useNavigate();
  const [isOpenModal, setOpenModal] = useState(false);

  const [isClicked, setIsClicked] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const handleDayOffClick = (index: number) => {
    setIsClicked((prevState) => {
      const newClickedState = [...prevState];
      newClickedState[index] = !prevState[index];
      return newClickedState;
    });
  };

  //입력 시 CTA 상태변화
  const [placeTextValue, setPlaceTextValue] = useState('');
  const handlePlaceText = (value: string) => {
    setPlaceTextValue(value);
  };

  const [addressAreaValue, setAddressAreaValue] = useState('');
  const handleAddressText = (value: string) => {
    setAddressAreaValue(value);
  };
  const isActive = addressAreaValue !== '' && placeTextValue !== '' && isClicked.some((clicked) => clicked);

  return (
    <>
      <ProgressBar whole={TOTAL_STEP.DESIGNER_VIEW} current={3} />
      <S.ShopInfoLayout>
        <Field name="소속" isEssential={true} />

        <Input placeholderText={HELPER_MESSAGE.INPUT_SHOP_NAME} onChangeFn={handlePlaceText} />
        <Field name="주소" isEssential={true} />

        <Input placeholderText={HELPER_MESSAGE.INPUT_DETAIL_ADRESS} onChangeFn={handleAddressText} />

        <Field name="주소" isEssential={false} />
        <S.DayOffWrapperBox>
          {days.map((day, index) => (
            <S.DayOffBox key={day} onClick={() => handleDayOffClick(index)} $isClicked={isClicked[index]}>
              {day}
            </S.DayOffBox>
          ))}
        </S.DayOffWrapperBox>

        <Button
          text="완료"
          isFixed={true}
          disabled={!isActive}
          onClickFn={() => {
            setOpenModal(true);
          }}
        />
      </S.ShopInfoLayout>
      <Button text="다음" isFixed={true} disabled={!isActive} onClickFn={() => setStep((prev) => prev + 1)} />
      {isOpenModal && (
        <Modal
          title="이대로 가입하시겠어요?"
          description="가입 후에는 수정이 어려워요"
          leftBtnText="돌아가기"
          rightBtnText="확인"
          leftBtnFn={() => setOpenModal(false)}
          rightBtnFn={() => navigate('/')}
        />
      )}
    </>
  );
};
export default ShopInfo;

const S = {
  ShopInfoLayout: styled.div`
    margin-top: 8.6rem;
    padding: 0 1.6rem;
  `,

  DayOffWrapperBox: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  DayOffBox: styled.div<{ $isClicked: boolean }>`
    padding: 1.2rem 1.45rem;
    border: 1.5px solid ${({ $isClicked, theme }) => ($isClicked ? theme.colors.moddy_blue : theme.colors.moddy_gray20)};
    border-radius: 8px;

    box-shadow: ${({ $isClicked, theme }) => ($isClicked ? theme.effects.shadow3 : '0 0 0 transparent')};

    color: ${({ $isClicked, theme }) => ($isClicked ? theme.colors.moddy_blue : theme.colors.moddy_gray50)};
    ${({ theme }) => theme.fonts.Body02};

    ${({ theme }) => theme.fonts.Body02};
  `,
};
