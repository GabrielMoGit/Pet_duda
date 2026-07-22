import styled from "styled-components";

interface StatusCardProps {
  $status: string;
}

interface ServiceButtonProps {
  $status: "success" | "warning";
}

export const ServiceButton = styled.button<ServiceButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 8px 16px;
  border: none;
  border-radius: 999px;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;
  transition: all 0.2s ease;

  background: ${({ $status }) =>
    $status === "success" ? "#DCFCE7" : "#FEF3C7"};

  color: ${({ $status }) => ($status === "success" ? "#15803D" : "#D97706")};

  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);

  &:active {
    transform: translateY(0);
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ $status }) => ($status === "success" ? "#86EFAC" : "#FCD34D")};
    outline-offset: 2px;
  }
`;

export const Card = styled.div<StatusCardProps>`
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 16px;

  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);

  transition: transform 0.2s ease;

  background: ${({ $status }) =>
    $status === "success" ? "#DCFCE7" : "#ffffff;"};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Info = styled.span`
  font-size: 12px;
  color: #64748b;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;

  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 12px;

  font-size: 13px;
  font-weight: 600;

  background: #dbeafe;
  color: #1d4ed8;
`;

export const Description = styled.div`
  display: inline-flex;
  align-items: center;

  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 12px;

  font-size: 13px;
  font-weight: 600;

  background: #dbfee4;
  color: #1dd852;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PetName = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
`;

export const Tutor = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #64748b;
`;

export const Phone = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: 14px;
  color: #475569;
`;

export const Icon = styled.span`
  font-family: "Material Symbols Outlined";
`;
