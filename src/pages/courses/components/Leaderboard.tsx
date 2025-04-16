import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 4rem 0;
  background: #F9FAFB;
  border-top: 1px solid #E5E7EB;
`;

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #E5E7EB;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

const ViewAll = styled.span`
  color: #3B82F6;
  font-weight: 500;
  cursor: pointer;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 0.75rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Rank = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #3B82F6;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
`;

const Name = styled.span`
  font-weight: 500;
`;

const XP = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: rgba(0,233,21,0.1);
  color: #00E915;
  font-weight: 500;
`;

export default function Leaderboard() {
  return (
    <Section id="leaderboard">
      <Container>
        <Header>
          <Title>Top Learners This Week</Title>
          <ViewAll>View All</ViewAll>
        </Header>
        <List>
          <ListItem>
            <UserInfo>
              <Rank>1</Rank>
              <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="User" />
              <Name>Sarah K.</Name>
            </UserInfo>
            <XP>850 XP</XP>
          </ListItem>
          <ListItem>
            <UserInfo>
              <Rank>2</Rank>
              <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="User" />
              <Name>Mike R.</Name>
            </UserInfo>
            <XP>720 XP</XP>
          </ListItem>
          <ListItem>
            <UserInfo>
              <Rank>3</Rank>
              <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="User" />
              <Name>Alex T.</Name>
            </UserInfo>
            <XP>650 XP</XP>
          </ListItem>
        </List>
      </Container>
    </Section>
  );
} 