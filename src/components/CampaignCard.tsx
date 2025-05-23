import {
  Badge,
  Card,
  createStyles,
  Flex,
  getStylesRef,
  Group,
  Image,
  PaperProps,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { ICampaign } from "../types";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    padding: theme.spacing.lg,
    backdropFilter: "blur(16px) saturate(180%)",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : "rgba(255, 255, 255, 0.75)",
    border: "2px solid rgba(209, 213, 219, 0.3)",
    transition: "all 150ms ease",

    [`&:hover .${getStylesRef("image")}`]: {
      transform: "scale(1.03)",
    },

    "&:hover": {
      boxShadow: theme.shadows.xl,
      borderColor: theme.colors.primary[7],
      backgroundColor: theme.colors.primary[0],
    },
  },

  title: {
    marginTop: theme.spacing.md,
  },

  image: {
    ref: getStylesRef("image"),
    transition: "transform 150ms ease",
  },
}));

interface IProps extends PaperProps {
  data: ICampaign;
  showActions?: boolean;
}

const CampaignCard = ({ data, showActions }: IProps) => {
  const { classes } = useStyles();

  const {
    _id,
    image,
    title,
    contributors,
    description,
    country,
    category,
    achievedAmount,
    fundingGoal,
    investments,
  } = data;

  const amountRaised = achievedAmount || 0;
  const totalGoal = fundingGoal || 1;
  const progress = Math.min((amountRaised / totalGoal) * 100, 100).toFixed(0);
  const donations = investments?.length || contributors || 0;

  const linkProps = {
    to: `/campaigns/${_id}`,
    rel: "noopener noreferrer",
  };

  return (
    <Card
      radius="sm"
      shadow="md"
      ml="xs"
      component={Link}
      {...linkProps}
      className={classes.card}
    >
     <Card.Section>
  <Image 
  src={image && image.startsWith("http") ? image : `http://localhost:5000${image}`} 
  height={280} 
  className={classes.image} 
  withPlaceholder 
/>

</Card.Section>

      <Card.Section pt={0} px="md" pb="md">
        <Stack>
          <Text className={classes.title} lineClamp={1} fw={500} size="lg">
            {title}
          </Text>

          <Group position="apart">
            <Text size="xs" tt="uppercase" color="dimmed" fw={700}>
              {country}
            </Text>
            <Badge variant="dot" color="secondary">
              {category}
            </Badge>
          </Group>

          {showActions && (
            <Text lineClamp={3} size="sm">
              {description}
            </Text>
          )}

          <Progress value={+progress} color="green" />

          <Flex justify="space-between">
            <Text size="sm">
              <b>${amountRaised}</b> raised
            </Text>
            <Text size="sm">
              <b>{donations}</b> donations
            </Text>
          </Flex>
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default CampaignCard;
