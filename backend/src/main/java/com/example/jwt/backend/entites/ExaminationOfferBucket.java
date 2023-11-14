package com.example.jwt.backend.entites;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table
@Getter
@Setter
public class ExaminationOfferBucket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "examination_offer_id")
    private ExaminationOffer examinationOffer;

    @ManyToOne
    @JoinColumn(name = "bucket_id")
    private Bucket bucket;

    private int amount;
}
