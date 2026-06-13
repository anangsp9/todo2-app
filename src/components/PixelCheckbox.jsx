import styled from "styled-components";

const PixelCheckbox = ({ checked, onChange }) => {
  return (
    <StyledWrapper>
      <div className="check-wrapper">
        <input
          type="checkbox"
          className="check"
          checked={checked}
          onChange={onChange}
        />

        <div className="light" />

        <div className="monitor">
          {Array.from({ length: 49 }, (_, i) => (
            <div
              key={i + 1}
              className="pixel"
              style={{ "--i": i + 1 }}
            />
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .check-wrapper {
    --pixel-color: #0006;
    --pixel-shadow: 0 0 4px -1px #000;
    --success-color: #9dff4c;
    --success-bg: #7ad62e55;
    --success-shadow: 0 0 12px 2px #9dff4c;
    --danger-color: #ff3b6c;
    --danger-bg: #00000055;
    --danger-shadow: 0 0 12px 2px #ff2f63;
    --pixel-size: 2px;
    --pixel-gap: 1px;
    --pad: 3px;
    --border-radius: 4px;

    position: relative;
    margin: 0;
  }

.check {
  position: absolute;
  inset: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

  .monitor {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    gap: var(--pixel-gap);
    padding: var(--pad);
    border-radius: var(--border-radius);
    border: 2px solid #0005;
    box-sizing: border-box;
    transition: background-color 1.8s ease;
    background-image: linear-gradient(to bottom, #fff7, #0003);
    background-color: var(--danger-bg);
    box-shadow:
      inset 0 6px 12px -5px #000,
      inset 0 -6px 12px -5px #000,
      0 6px 12px -5px #0007,
      0 8px 16px -5px #0007;
  }

  .monitor:before {
    content: "";
    position: absolute;
    inset: -10%;
    width: 120%;
    height: 120%;
    background-color: #0002;
    background-image: linear-gradient(to bottom, #0000, #0002);
    border-radius: calc(var(--border-radius) + var(--pad));
    box-shadow:
      0px 1px 1px rgba(3, 7, 18, 0.02),
      0px 5px 4px rgba(3, 7, 18, 0.03),
      0px 12px 9px rgba(3, 7, 18, 0.05),
      0px 20px 15px rgba(3, 7, 18, 0.06),
      0px 32px 24px rgba(3, 7, 18, 0.08);
    z-index: -1;
    pointer-events: none;
  }

  .light {
    position: absolute;
    inset: -50% -25%;
    width: 150%;
    height: 150%;
    background-color: #fff2;
    filter: blur(16px);
    pointer-events: none;
    z-index: 1;
    transition: all 0.3s ease;
    opacity: 0;
  }
  .check:hover ~ .light {
    opacity: 1;
  }

  .pixel {
    pointer-events: none;
    width: var(--pixel-size);
    height: var(--pixel-size);
    background-color: var(--pixel-color);
    box-shadow: var(--pixel-shadow);
    border-radius: 2px;
    transition:
      background-color 1.8s ease,
      box-shadow 1.8s ease;
    transition-delay: 0s;
  }

  .pixel:nth-child(9) {
    background-color: var(--danger-color);
    box-shadow: var(--danger-shadow);
  }
  .pixel:nth-child(13) {
    background-color: var(--danger-color);
    box-shadow: var(--danger-shadow);
  }
  .pixel:nth-child(17) {
    background-color: var(--danger-color);
    box-shadow: var(--danger-shadow);
  }
  .pixel:nth-child(19) {
    background-color: var(--danger-color);
    box-shadow: var(--danger-shadow);
  }
  .pixel:nth-child(25) {
    background-color: var(--danger-color);
    box-shadow: var(--danger-shadow);
  }
  .pixel:nth-child(31) {
    background-color: var(--danger-color);
    box-shadow: var(--danger-shadow);
  }
  .pixel:nth-child(33) {
    background-color: var(--danger-color);
    box-shadow: var(--danger-shadow);
  }
  .pixel:nth-child(37) {
    background-color: var(--danger-color);
    box-shadow: var(--danger-shadow);
  }
  .pixel:nth-child(41) {
    background-color: var(--danger-color);
    box-shadow: var(--danger-shadow);
  }

  .check:checked ~ .monitor .pixel:nth-child(9),
  .check:checked ~ .monitor .pixel:nth-child(17),
  .check:checked ~ .monitor .pixel:nth-child(25),
  .check:checked ~ .monitor .pixel:nth-child(33),
  .check:checked ~ .monitor .pixel:nth-child(41),
  .check:checked ~ .monitor .pixel:nth-child(13),
  .check:checked ~ .monitor .pixel:nth-child(19),
  .check:checked ~ .monitor .pixel:nth-child(31),
  .check:checked ~ .monitor .pixel:nth-child(37) {
    background-color: var(--pixel-color);
    box-shadow: none;
  }

  .check:checked ~ .monitor .pixel:nth-child(13),
  .check:checked ~ .monitor .pixel:nth-child(19),
  .check:checked ~ .monitor .pixel:nth-child(23),
  .check:checked ~ .monitor .pixel:nth-child(25),
  .check:checked ~ .monitor .pixel:nth-child(31) {
    background-color: var(--success-color);
    box-shadow: var(--success-shadow);
  }

  .check:checked ~ .monitor {
    background-color: var(--success-bg);
  }

  .check:checked ~ .monitor .pixel {
    animation: animate 1.8s ease;
    animation-delay: calc(var(--i) * 0.02s);
    transition-delay: calc(var(--i) * 0.02s);
  }

  @keyframes animate {
    20% {
      filter: drop-shadow(0 -3px 3px white);
      transform: scaleX(0.5);
    }
    100% {
      transform: rotateY(180deg);
    }
  }`;


export default PixelCheckbox;